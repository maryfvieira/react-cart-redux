import { combineReducers } from 'redux';

//import slices
import cartSliceReducer from '@redux/slices/cartSlice'; 
import userSliceReducer from '@redux/slices/userSlice'; 

const rootReducer = combineReducers({
    cart: cartSliceReducer,
    user: userSliceReducer,
});

export default rootReducer;