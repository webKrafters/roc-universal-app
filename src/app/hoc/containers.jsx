import { connectDemoStore } from '../../context';

import CustomerPhoneDisplayComponent from '../../components/customer-phone-display';
import EditorComponent from '../../components/editor';
import PriceStickerComponent from '../../components/price-sticker';
import ProductDescriptionComponent from '../../components/product-description';
import ResetComponent from '../../components/reset';
import TallyDisplayComponent from '../../components/tally-display';

export const CustomerPhoneDisplay = connectDemoStore({ phone: 'customer.phone' })( CustomerPhoneDisplayComponent );
export const Editor = connectDemoStore()( EditorComponent );
export const PriceSticker = connectDemoStore({ p: 'price' })( PriceStickerComponent );
export const ProductDescription = connectDemoStore({ c: 'color', t: 'type' })( ProductDescriptionComponent );
export const Reset = connectDemoStore()( ResetComponent );
export const TallyDisplay = connectDemoStore({
	color: 'color',
	name: 'customer.name',
	price: 'price',
	type: 'type'
})( TallyDisplayComponent );
