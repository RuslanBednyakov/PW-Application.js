import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'
import authReducer, {moduleName as authModule} from '../ducks/auth'

export default (history) => combineReducers({
  router: connectRouter(history),
  form: formReducer,
  [authModule]: authReducer,
})