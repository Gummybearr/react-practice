import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

import Country from './Country';

const CountryContainer = (props) =>{
    let countries = props?.countries
    return (
        <div className="divTable">
            <div className="divTableBody">
                <div className="divTableRow">
                    <div className="divTableCell">Name</div>
                    <div className="divTableCell">Alpha2Code</div>
                    <div className="divTableCell">CallingCodes</div>
                    <div className="divTableCell">Capital</div>
                    <div className="divTableCell">Region</div>
                    <div className="divTableCell">Action</div>
                </div>
                {countries.map((country)=> (<Country
                    key={country.name}
                    name={country.name}
                    alpha2Code={country.alpha2Code}
                    callingCodes={country.callingCodes}
                    capital={country.capital}
                    region={country.region}
                    action='delete'
                />))}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({countries: state.fetchCountries.countries})

const mapDispatchToProps = (dispatch) => {
    return {
        list: () => {
            dispatch({type: 'GET_DATA', payload: []})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryContainer);