import { createContext, useContext } from 'react';

import { createEagleEye } from '@webkrafters/react-observable-context';

export { FULL_STATE_SELECTOR } from '@webkrafters/react-observable-context';

export const getDemoInitState = () => ({
	color: 'Burgundy',
	customer: {
		name: {
			first: null,
			last: null
		},
		phone: null
	},
	price: 22.5,
	type: ''
});

export const DemoContext = createContext( null );

export const createDemoStore = initialState => createEagleEye({
	...getDemoInitState(), ...( initialState ?? {} )
});

export const connectDemoStore = selectorMap => Component => props => {
	const store = useDemoStream( selectorMap );
	return ( <Component { ...store } { ...props } /> );
};

export const useDemoStream = selectorMap => {
	const { useStream } = useContext( DemoContext ) ?? {};
	if( !useStream ) {
		throw new Error( 'useDemoStream must be used within a DemoContext.Provider' );
	}
  	return useStream( selectorMap );
}
