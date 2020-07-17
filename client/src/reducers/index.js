import { combineReducers } from 'redux';
import productsReducers from "./productsReducers"
import { reducer as FormReducer } from 'redux-form';
import authReducer from "./authReducer"

export default combineReducers({
  products: productsReducers,
  form: FormReducer,
  auth: authReducer,
})
