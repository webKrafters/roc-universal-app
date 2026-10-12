import { useCallback } from 'react';

import { useDemoStream } from '../../context';

import Editor from '../../components/with-context/editor';
import PriceSticker from '../../components/with-context/price-sticker';
import ProductDescription from '../../components/with-context/product-description';
import TallyDisplay from '../../components/with-context/tally-display';

const Product = () => {

	const { setState } = useDemoStream();

	const overridePricing = useCallback( e => setState({ price: Number( e.target.value ) }), [ setState ] );

	return (
		<div>
			<div style={{ marginBottom: 10 }}>
				<label>$ <input onKeyUp={ overridePricing } placeholder="override price here..." /></label>
			</div>
			<div style={{
				borderBottom: '1px solid #333',
				marginBottom: 10,
				paddingBottom: 5
			}}>
				<Editor />
				<TallyDisplay />
			</div>
			<ProductDescription />
			<PriceSticker />
		</div>
	);

};

Product.displayName = 'Product';

export default Product;
