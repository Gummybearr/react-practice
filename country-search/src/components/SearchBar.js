import React from 'react';
import {connect} from 'react-redux'
import axios from 'axios'

import './SearchBar.css';

const SearchBar = (props) => {

    return <div>
        searchBar
        <div id="ok" onClick={props.onClick}>
            go search
        </div>
    </div>
}


const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => {
            const result = axios.get('https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes')
            .then(res=> dispatch({type: 'FETCH_DATA', payload: res.data}))
        }
    }
}

export default connect(null, mapDispatchToProps)(SearchBar);