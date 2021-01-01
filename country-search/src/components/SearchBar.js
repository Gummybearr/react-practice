import React from 'react';
import {connect} from 'react-redux'
import axios from 'axios'

import './SearchBar.css';

const SearchBar = (props) => {

    // const clickSearch = () => {console.log('ok')}

    return <div>
        searchBar
        <div id="ok" onClick={props.onClick}>
            go search
        </div>
    </div>
}

export default connect(null, (dispatch) => {
    return {
        onClick: () => {
            const result = axios.get('https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes')
            .then((res)=> (dispatch({type: 'FETCH_DATA', data: res})))
        }
    }
})(SearchBar);