import { combineReducers } from 'redux'
import formReducer from './formReducer'
import filesReducer from './filesReducer'

export default combineReducers({
  files: filesReducer,
  form: formReducer,
})
