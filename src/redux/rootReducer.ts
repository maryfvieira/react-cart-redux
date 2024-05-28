import { combineReducers } from 'redux';

//import slices
import cartSliceReducer from '@redux/slices/cartSlice'; 

const rootReducer = combineReducers({
    cart: cartSliceReducer,
});

export default rootReducer;