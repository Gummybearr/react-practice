import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux';
import store from './store';

import 'react-app-polyfill/ie11'

import App from './App'

ReactDom.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'))