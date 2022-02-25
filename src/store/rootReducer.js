// modules
import {combineReducers} from 'redux'

// reducers
import sessionReducer from './session/reducer'

const rootReducer = combineReducers({
    session: sessionReducer,
});

export default rootReducer;