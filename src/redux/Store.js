import reducer from './reducers/index'
import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

let middlewares = applyMiddleware(thunk)

export const store = createStore(reducer, middlewares)
