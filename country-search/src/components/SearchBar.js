import React from 'react';
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import axios from 'axios'

import './SearchBar.css'

const SearchBar = (props) => {

    return <div>
        <form>
            <input name="countryName" type="text" id="countryName" placeholder="Name"/>
            <input name="countryAlpha2Code" type="text" id="alpha2Code" placeholder="Alpha2Code"/>
            <input name="countryCallingCodes" type="text" id="countryCallingCodes" placeholder="CallingCodes"/>
            <input name="capital" type="text" id="capital" placeholder="capital"/>
            <input name="region" type="text" id="region" placeholder="region"/>
            <div onClick={props.onClick}>Search</div>
        </form>
        {/* <div id="ok" onClick={props.onClick}>
            
        </div> */}
    </div>
}


const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (props) => {
            console.log(props)
            const result = axios.get('https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes')
            .then(res=> dispatch({type: 'FETCH_DATA', payload: res.data}))
        }
    }
}

export default connect(null, mapDispatchToProps)(SearchBar);