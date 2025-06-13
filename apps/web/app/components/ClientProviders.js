'use client';

import { Provider } from 'react-redux';
import store from '../store/configureStore';
import { Nav } from './Nav';

export default function ClientProviders({ children }) {
  return (
    <Provider store={store}>
      <Nav />
      <div style={{ paddingTop: '3em' }}>{children}</div>
    </Provider>
  );
}
