import { createStore, applyMiddleware } from 'redux';
//import logger from 'redux-logger';

// @ts-ignore
import storage from 'redux-persist/lib/storage';

// @ts-ignore
import { persistReducer } from 'redux-persist/es/persistReducer';

// @ts-ignore
import { persistStore } from 'redux-persist/es/persistStore';

import rootReducer from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReducer'] // reducers to persist
};

const persistedRootReducer: typeof rootReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedRootReducer);
export const persistedStore = persistStore(store);
//const store = createStore(rootReducer, applyMiddleware(logger));

export type RootState = ReturnType<typeof store.getState>;
