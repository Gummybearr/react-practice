import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

import Country from './Country';

const CountryContainer = (props) =>{
    let countries = props?.countries
    let volatileCountries = props?.volatileCountries
    let sort = props?.sort
    let searchMode = props.searchMode
    return (
        <div className="divTable">
            <div className="divTableBody">
                <div className="divTableRow">
                    <div className="divTableCell" onClick={
                        () => (props.onSort({sort: sort, target: 'name', countries: countries, volatileCountries: volatileCountries, searchMode: searchMode}))}
                    >
                        Name
                    </div>
                    <div className="divTableCell" onClick={
                        () => (props.onSort({sort: sort, target: 'alpha2Code', countries: countries, volatileCountries: volatileCountries, searchMode: searchMode}))}
                    >
                        Alpha2Code
                    </div>
                    <div className="divTableCell" onClick={
                        () => (props.onSort({sort: sort, target: 'callingCodes', countries: countries, volatileCountries: volatileCountries, searchMode: searchMode}))}
                    >
                        CallingCodes
                    </div>
                    <div className="divTableCell" onClick={
                        () => (props.onSort({sort: sort, target: 'capital', countries: countries, volatileCountries: volatileCountries, searchMode: searchMode}))}
                    >
                        Capital
                    </div>
                    <div className="divTableCell" onClick={
                        () => (props.onSort({sort: sort, target: 'region', countries: countries, volatileCountries: volatileCountries, searchMode: searchMode}))}
                    >
                        Region
                    </div>
                    <div className="divTableCell">Action</div>
                </div>
                {props.searchMode==='reset'?
                    countries.map((country)=> (<Country
                        key={country.name}
                        name={country.name}
                        alpha2Code={country.alpha2Code}
                        callingCodes={country.callingCodes}
                        capital={country.capital}
                        region={country.region}
                        action='delete'
                    />)):volatileCountries.map((country)=> (<Country
                        key={country.name}
                        name={country.name}
                        alpha2Code={country.alpha2Code}
                        callingCodes={country.callingCodes}
                        capital={country.capital}
                        region={country.region}
                        action='add'
                    />))
                }
                
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
            countries: state.searchCountries.countries,
            volatileCountries: state.searchCountries.volatileCountries,
            sort: state.searchCountries.sort
        }
}

const mapDispatchToProps = (dispatch) => {
    return {
        list: () => {
            dispatch({type: 'GET_DATA', payload: []})
        },
        onSort: (props) => {
            let field = ''
            let method = ''
            let countries = props.countries.map((country)=>(country))
            let volatileCountries = props.volatileCountries.map((country)=> (country))
            let searchMode = props.searchMode

            if(props.sort.field==props.target){
                method = props.sort.method==='ASCENDING'?'DESCENDING':'ASCENDING'
            } else{
                method='ASCENDING'
            }

            field = props.target

            if(searchMode==='reset'){
                if(countries?.length){
                    countries.sort((a,b)=> {
                        if(method==='ASCENDING'){
                            return a[field]>b[field]?1:-1
                        } else{
                            return a[field]<b[field]?1:-1
                        }
                    })
                }
            } else{
                if(volatileCountries?.length){
                    volatileCountries.sort((a,b)=> {
                        if(method==='ASCENDING'){
                            return a[field]>b[field]?1:-1
                        } else{
                            return a[field]<b[field]?1:-1
                        }
                    })
                }
            }

            dispatch({type: 'SORT_DATA', payload: 
                {
                    sort: {'field': field, 'method': method},
                    countries: countries,
                    volatileCountries: volatileCountries
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryContainer);