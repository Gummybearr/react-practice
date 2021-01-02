import React from 'react';
import {connect} from 'react-redux'
import {Formik, Form} from 'formik'
import axios from 'axios'

import './SearchBar.css'

const SearchBar = (props) => {

  return (<div>
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
        props.onClick(values)
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
            onChange={handleChange}
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
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </form>
      )}
    </Formik>
  </div>)
}

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
      console.log(props)
      const result = axios.get('https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes')
      .then((res)=> {
        let countries = res.data.filter((country)=> (stringSubMatch(country, props)?country:null))
        console.log(countries)
        dispatch({type: 'SEARCH_DATA', payload: countries})
      })
    }
  }
}

export default (connect(null, mapDispatchToProps)(SearchBar));