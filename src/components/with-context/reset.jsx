import { useCallback, useEffect } from 'react'

import { useDemoStream } from '../../context';

const Reset = () => {
	const { resetState } = useDemoStream();
	const reset = useCallback(() => resetState([ '@@STATE' ]), [ resetState ]);
	return ( <button className='reset' onClick={ reset }>reset context</button> );
};

Reset.displayName = 'Reset';

export default Reset;
