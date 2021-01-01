import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducer'
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk, logger)),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);