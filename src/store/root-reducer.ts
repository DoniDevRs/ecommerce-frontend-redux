import { combineReducers } from 'redux';
import userReducer from './reducers/user/user.reducer';
import cartReducer from './reducers/cart/cart.reducer';
import categoryReducer from './reducers/category/category.reducer';


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