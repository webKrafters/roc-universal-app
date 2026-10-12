import {
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react';

import { Link, Outlet } from 'react-router-dom';

import { AppType } from '../context/app-type';
import { DemoContext } from '../context';

import { useExternalObserver } from './ext-observer';

import Hoc from './hoc';
import Memo from './memo';
import Normal from './normal';

import Logo from '../wklogo-outline.png';

import './style.css';

const getNavItemProps = isCurrent => ({
	...isCurrent ? { className: 'current' } : {},
	rel: 'nofollow noreferrer',
	target: 'blank'
});

const prehooks = {
	resetState: ( ...args ) => {
		console.log( 'prehook says: resetting state with >>>> ', JSON.stringify( args ) );
		return true;
	},
	setState: ( ...args ) => {
		console.log( 'prehook says: merging following into state >>>> ', JSON.stringify( args ) );
		return true;
	}
};

const year = new Date().getFullYear();

const Layout = () => {

	const demoType = useContext( AppType );

	const demoStore = useContext( DemoContext );

	const [ productType, setProductType ] = useState( 'Calculator' );
	
	const updateType = useCallback( e => setProductType( e.target.value ), [] );

	useEffect(() => { demoStore.prehooks = prehooks }, []);

	useEffect(() => {
		const t = setTimeout(
			() => demoStore.store.setState({ type: productType }),
			1e3
		);
		return () => clearTimeout( t );
	}, [ productType ]);

	useEffect(() => demoStore.store.subscribe(
		'data-updated',
		( a, b, c ) => 'type' in c && setProductType( c[ 'type' ] )
	), []);

	useExternalObserver( demoStore );

	return (
		<div className="App">
			<div>
				<h1>
					<img src={ Logo } alt="wk logo" />
					<p>
						<span>@webkrafters/react-observable-context <u>ssr</u> demo</span>
						<a
							href="https://www.npmjs.com/package/@webkrafters/react-observable-context"
							rel="no-follow"
						>
							Eagle Eye
						</a>
					</p>
				</h1>
				<nav>
					<label>App types:</label>
					<a href='/' { ...getNavItemProps( demoType === 'normal' ) }>usecontext</a>
					<a href='?t=memo' { ...getNavItemProps( demoType === 'memo' ) }>memo(usecontext)</a>
					<a href='?t=hoc' { ...getNavItemProps( demoType === 'hoc' ) }>connect <i>(recommended)</i></a>
				</nav>
				<main>
					<h1><i style={{ color: '#f90' }}>SSR</i> { demoType === 'normal' ? 'D' : `${ demoType } d` }emo</h1>
					<h2>A contrived product app.</h2>
					<nav>
						<Link to='/'>Home</Link>
						<Link to='/about'>About</Link>
					</nav>
					<div style={{ marginBottom: 10 }}>
						<label>
							Type:{ ' ' }
							<input
								onKeyUp={ updateType }
								placeholder="override product type here..."
							/>
						</label>
					</div>
					<Outlet />
				</main>
			</div>
			<footer>
				&copy;2026{ year > 2026 ? `-${ year }` : '' } <a href="https://webkrafters.tech" rel="no-follow">webKrafters</a>. All rights reserved.
			</footer>
		</div>
	);
};

Layout.displayName = 'Layout';

export default Layout;
