import { createStore, applyMiddleware } from 'redux';
//import logger from 'redux-logger';
import { thunk } from 'redux-thunk';


import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReducer'] // reducers to persist
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedRootReducer as typeof rootReducer,
  applyMiddleware(thunk)
);
export const persistedStore = persistStore(store);
//const store = createStore(rootReducer, applyMiddleware(logger));

export type RootState = ReturnType<typeof store.getState>;
