import { connectDemoStore } from '../../context';

import { ProductDescription, Reset } from './containers';

const Detail = connectDemoStore({ type: 'type' })(
	({ data: { type }}) => (
		<div>
			<h1>A bit about { type ?? 'n.a.'}</h1>
			<ProductDescription />
			<div style={{ marginTop: '2rem' }}>
				<Reset /> entirely from here!
			</div>
		</div>
	)
);

Detail.displayName = 'Detail';

export default Detail;

