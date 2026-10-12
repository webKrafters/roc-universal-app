import fs from 'fs';
import path from 'path';

import express from 'express';

import { renderToString } from 'react-dom/server';
import { Router } from 'react-router-dom';

import { createMemoryHistory } from 'history';

import {
	createDemoStore,
	DemoContext,
	FULL_STATE_SELECTOR
} from './context';

import { App } from './app';

const PORT = process.env.PORT ?? 8000;

const ORIGIN = `http://localhost:${ PORT }`;

const app = express();

app.use( express.static( 'dist/client', { index: false } ) );

for( const p of [
	'/favicon.ico',
	'/.well-known/appspecific/com.chrome.devtools.json'
]) {
	app.get( p, ( req, res ) => {
		const f = path.resolve( `dist/client${ p }` );
		return !fs.existsSync( f )
			? res.status( 204 ).end()
			: res.sendFile( f );
	} );
}

let shellMonitor = null;
let shellParts = [];

app.get( '*', async ( req, res ) => {

	try {

		if( !shellParts.length ) {
			const sep = '<!-- template -->';
			const shell = fs.readFileSync( 'dist/client/index.html', 'utf-8' );
			shellParts = shell.split( sep );
		}
		clearTimeout( shellMonitor );
		shellMonitor = setTimeout( () => {
			shellParts.length = 0;
			shellMonitor = null;
		}, 1.08e7 );

		const demoStore = createDemoStore();
		const demoType = sanitizeRequestedDemo( req.query?.t );
		const navigator = createMemoryHistory({ initialEntries: [ req.url ] });

		res.status( 200 );
		res.setHeader( 'Content-Type', 'text/html; charset=utf-8' );
		res.send(
			`${ shellParts[ 0 ] }${
				renderToString(
					<DemoContext.Provider value={ demoStore }>
        				<Router { ...{ location: navigator.location, navigator } }>
							<App demoType={ demoType } />
						</Router>
					</DemoContext.Provider>
				)
			}${ shellParts[ 1 ] }
				window.__DEMO_TYPE__ = "${ demoType }";
				window.__INITIAL_STATE__ = ${ JSON.stringify( demoStore.store.getState([ FULL_STATE_SELECTOR ]) ) };
			${ shellParts[ 2 ] }`
		);
	} catch( err ) {
		console.error( err );
		res.status( 500 );
		res.send( '<!doctype html><div>Critical System Render Error</div>' );
	}
});

const server = app.listen( PORT, () => {
	console.info( `React Observable Context universal demo running at port ${ PORT }.` );
	console.info( ORIGIN );
} );

process.on( 'SIGINT', () => {
	clearTimeout( shellMonitor );
  	server.close(() => process.exit( 0 ));
} );

function sanitizeRequestedDemo( t ) {
	switch( t ) {
		case 'hoc': return 'hoc';
		case 'memo': return 'memo';
		default: return 'normal';
	}
}
