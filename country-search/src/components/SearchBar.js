import React from 'react';
import {connect} from 'react-redux'
import {Formik, Form} from 'formik'
import axios from 'axios'

import './SearchBar.css'

const SearchBar = (props) => {
  console.log(props.searchMode)
  return (<div>
    {/* using Formik to capture data at once */}
    <Formik 
      initialValues={{
        name: '', 
        alpha2Code: '',
        callingCodes: '',
        capital: '',
        region: ''
      }}
      onSubmit={(values, {setSubmitting, resetForm}) => {
        resetForm()
        //will enable dispatcher with searched values and searchMod
        //searchMode will be 'reset' for main search bar and 'add' for sub-search bar 
        props.onClick({'values': values, 'searchMode': props.searchMode})
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange} //gets triggered when user types/edits values in input tag
            value={values.name}
          />
          <input
            type="text"
            name="alpha2Code"
            maxLength='2'
            placeholder="Alpha2Code"
            onChange={handleChange}
            value={values.alpha2Code}
          />
          <input
            type="text"
            name="callingCodes"
            placeholder="CallingCodes"
            onChange={handleChange}
            value={values.callingCodes}
          />
          <input
            type="text"
            name="capital"
            placeholder="Capital"
            onChange={handleChange}
            value={values.capital}
          />
          <input
            type="text"
            name="region"
            placeholder="Region"
            onChange={handleChange}
            value={values.region}
          />
          {/* It doesn't refresh the page after submitting, but dedicated function will be triggered */}
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </form>
      )}
    </Formik>
  </div>)
}

//declared this function to see if there is complete/partial match between countries
//first parameter should be the country in the server and the second parameter should be the searched values
function stringSubMatch(country1, country2){
  let flag = {
    name: false,
    alpha2Code: false,
    callingCodes: false,
    capital: false,
    region: false
  }
  for(let i in country2){
    if(!country2[i]){
      flag[i]=true
    } else{
      if(country1[i]?.toLowerCase().includes(country2[i]?.toLowerCase())){
        flag[i] = true
      }
    }
  }
  return flag.name&flag.alpha2Code&flag.callingCodes&flag.capital&flag.region
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (props) => {
      //firstly gets data from the server
      const result = axios.get('https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes')
      .then((res)=> {
        //then filter countries using custom function
        let countries = res.data.filter((country)=> (stringSubMatch(country, props.values)?country:null))
        //and then dispatches it to reducer
        dispatch({type: 'SEARCH_DATA', payload: {search: props.values, countries: countries, searchMode: props.searchMode}})
      })
    }
  }
}

export default (connect(null, mapDispatchToProps)(SearchBar));