import React, { createContext, useMemo } from 'react';

import { AppType } from '../context/app-type';

import Hoc from './hoc';
import Memo from './memo';
import Normal from './normal';

if( typeof window === 'undefined' ) {
	React.useLayoutEffect = () => {};
}

export function App({ demoType = '' }) {
	const Demo = useMemo(() => {
		switch( demoType ) {
			case 'hoc': return Hoc;
			case 'memo': return Memo;
		} 
		return Normal;
	}, [ demoType ]);
	return (
		<AppType.Provider value={ demoType }>
			<Demo />
		</AppType.Provider>
	);
}
