import { combineReducers } from 'redux';
import fetchCountries from './reducers/country';

export default combineReducers(
    {fetchCountries}
);