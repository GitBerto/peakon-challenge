import { combineReducers } from 'redux'
import { postsByEmployees, filterBySearch } from './employees';

const rootReducer = combineReducers({
    postsByEmployees,
    filterBySearch
});
  
export default rootReducer