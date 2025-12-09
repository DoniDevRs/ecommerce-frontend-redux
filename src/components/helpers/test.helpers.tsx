import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import rootReducer from '../../store/root-reducer'
import { RootState } from '../../store/store'

export const renderWithRedux = (
  component: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    }),
    ...renderOptions
  }: {
    preloadedState: RootState;
    store?: any;
  }
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );

  return render(component, { wrapper: Wrapper, ...renderOptions });
};