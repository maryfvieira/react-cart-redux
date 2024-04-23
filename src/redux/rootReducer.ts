import { combineReducers } from 'redux';

//import slices
import mainSliceReducer from './slices/mainSlice';
import cartSlice from './slices/cartSlice'; 

const rootReducer = combineReducers({
    cards: mainSliceReducer,
    cart: cartSlice
});

export default rootReducer;