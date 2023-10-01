import {compose,combineReducers,applyMiddleware} from 'redux';
import { legacy_createStore as createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
//compose is used to combine 2 or more store enhancers, applyMidleware is a store enhancer,used to enhance the store with third party libraries
import {authReducer} from './reducers/authReducer'
import { messengerReducer } from './reducers/messengerReducer';
const rootReducer = combineReducers({
auth:authReducer,
messenger:messengerReducer,
})

const middleware = [thunkMiddleware];

const store = createStore(rootReducer,compose(applyMiddleware(...middleware),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
));

export default store;