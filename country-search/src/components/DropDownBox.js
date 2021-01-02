import React from 'react';
import {connect} from 'react-redux'

import SearchBar from './SearchBar'
import CountryContainer from './CountryContainer'

const DropDownBox = (props) => {
    let dropDownBoxFlag = props.dropDownBoxFlag
    return (
        <div>
            <div>Click <button onClick={() => {props.toggleDropDownBoxFlag(dropDownBoxFlag)}}>HERE</button> to  
            {dropDownBoxFlag?' close this drop-down box':' add individual countries to your list'}</div>
            {dropDownBoxFlag?
                <>
                    <SearchBar searchMode='add'/>
                    <CountryContainer searchMode='add'/>
                </>
            :null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dropDownBoxFlag: state.searchCountries.dropDownBoxFlag
}}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleDropDownBoxFlag: (props) => {
            dispatch({type: 'TOGGLE_DROPDOWNBOX', payload: props})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownBox)