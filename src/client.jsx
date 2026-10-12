import { hydrateRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import { createDemoStore, DemoContext } from './context';

import { App } from './app';

hydrateRoot(
	document.getElementById( 'root' ),
	<DemoContext.Provider value={ createDemoStore( window.__INITIAL_STATE__ ) }>
		<BrowserRouter>
			<App demoType={ window.__DEMO_TYPE__ } />
		</BrowserRouter>
	</DemoContext.Provider>
);
