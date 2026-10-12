import { memo } from 'react';

import CustomerPhoneDisplayComponent from '../../components/with-context/customer-phone-display';
import EditorComponent from '../../components/with-context/editor';
import PriceStickerComponent from '../../components/with-context/price-sticker';
import ProductDescriptionComponent from '../../components/with-context/product-description';
import ResetComponent from '../../components/with-context/reset';
import TallyDisplayComponent from '../../components/with-context/tally-display';

export const CustomerPhoneDisplay = memo( CustomerPhoneDisplayComponent );
export const Editor = memo( EditorComponent );
export const PriceSticker  = memo( PriceStickerComponent );
export const ProductDescription = memo( ProductDescriptionComponent );
export const Reset = memo( ResetComponent );
export const TallyDisplay = memo( TallyDisplayComponent );
