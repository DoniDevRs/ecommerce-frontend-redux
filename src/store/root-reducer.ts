import { combineReducers } from 'redux';
import userReducer from './toolkit/user/user.slice';
import cartReducer from './toolkit/cart/cart.slice';
import categoryReducer from './toolkit/category/category.slice';

// Permite Partial<State> para compatibilidade com redux-persist
const appReducers = combineReducers({
    userReducer,
    cartReducer,
    categoryReducer
});

const rootReducer = (state: ReturnType<typeof appReducers> | undefined, action: any) => {
    return appReducers(state, action);
};

export default rootReducer;