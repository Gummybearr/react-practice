import React from 'react';
import {connect} from 'react-redux'

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
            dispatch({type:'CHANGE_MODE', mode: 'WELCOME'})
        }
    }
})(SearchBar);