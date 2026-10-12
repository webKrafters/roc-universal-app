import { Route, Routes } from 'react-router-dom';

import AboutView from './description';
import HomeView from './product';
import Layout from '../layout';

export default () => (
	<Routes>
		<Route path='/' element={ <Layout /> }>
			<Route index element={ <HomeView /> } />
			<Route path='/about' element={ <AboutView /> } />
		</Route>
	</Routes>
);
