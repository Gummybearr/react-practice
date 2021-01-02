import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

import Country from './Country';

const CountryContainer = (props) =>{
    let countries = props?.countries
    let sort = props?.sort
    return (
        <div className="divTable">
            <div className="divTableBody">
                <div className="divTableRow">
                    <div className="divTableCell" onClick={
                        () => (props.onSort({sort: sort, target: 'name', countries: countries}))}
                    >
                        Name
                    </div>
                    <div className="divTableCell" onClick={
                        () => (props.onSort({sort: sort, target: 'alpha2Code', countries: countries}))}
                    >
                        Alpha2Code
                    </div>
                    <div className="divTableCell" onClick={
                        () => (props.onSort({sort: sort, target: 'callingCodes', countries: countries}))}
                    >
                        CallingCodes
                    </div>
                    <div className="divTableCell" onClick={
                        () => (props.onSort({sort: sort, target: 'capital', countries: countries}))}
                    >
                        Capital
                    </div>
                    <div className="divTableCell" onClick={
                        () => (props.onSort({sort: sort, target: 'region', countries: countries}))}
                    >
                        Region
                    </div>
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

const mapStateToProps = (state) => {
    return {
    countries: state.searchCountries.countries,
    sort: state.searchCountries.sort
}}

const mapDispatchToProps = (dispatch) => {
    return {
        list: () => {
            dispatch({type: 'GET_DATA', payload: []})
        },
        onSort: (props) => {
            let field = ''
            let method = ''
            let countries = props.countries.map((country)=>(country))

            if(props.sort.field==props.target){
                method = props.sort.method==='ASCENDING'?'DESCENDING':'ASCENDING'
            } else{
                method='ASCENDING'
            }

            field = props.target

            if(countries?.length){
                countries.sort((a,b)=> {
                    if(method==='ASCENDING'){
                        return a[field]>b[field]?1:-1
                    } else{
                        return a[field]<b[field]?1:-1
                    }
                })
            }

            dispatch({type: 'SORT_DATA', payload: 
                {
                    sort: {'field': field, 'method': method},
                    countries: countries
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryContainer);