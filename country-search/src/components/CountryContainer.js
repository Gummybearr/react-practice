import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

import Country from './Country';

const CountryContainer = (props) =>{
    let countries = props?.countries
    return (
        <div>          
            {countries.map((country)=> (<Country
                key={country.name}
                name={country.name}
                alpha2Code={country.alpha2Code}
                callingCodes={country.callingCodes}
                capital={country.capital}
                region={country.region}
            />))}
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