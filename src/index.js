import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './router';

import Store from './store'
import { Persistgate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { Container } from './helpers/toast'

const persist = persistStore(Store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Persistgate loading={null} persistore={persist}>
        <App />
        <Container />
      </Persistgate>
    </Provider>
  </React.StrictMode>
);

