import { combineReducers } from 'redux';
import searchCountries from './reducers/country';

// not really needed for this project, but will be needed if project
// should handle mutiple reducers 
export default combineReducers(
    {searchCountries}
);