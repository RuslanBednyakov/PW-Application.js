import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import history from '../history'
import createRootReducer from './reducers'

const enchancer = applyMiddleware(routerMiddleware(history), logger);
const store = createStore(createRootReducer(history), enchancer);

//for dev mode only
window.store = store;

export default store