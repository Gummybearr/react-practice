const initState = {
    type: 'STANDBY',
    search: '',
    searchMode: '',
    sort: {field: 'name', method: 'ASCENDING'},
    countries: [],
    dropDownBoxFlag: false,
    volatileCountries: []
}

export default (state=initState, action='') => {
    if(action.type==='SEARCH_DATA'){
        state.type = 'SEARCH_DATA'
        state.search = action?.payload?.search
        state.searchMode = action?.payload?.searchMode
        if(state.searchMode==='reset'){
            state.countries = action?.payload?.countries
        } else{
            state.volatileCountries = action?.payload.countries
        }
        return {...state}
    }
    if(action.type==='DELETE_COUNTRY'){
        state.type='DELETE_DATA'
        const countries = state.countries.filter((country)=> (country.name===action.payload?null:country))
        state.countries = countries
        return {...state}
    }
    if(action.type==='ADD_COUNTRY'){  
        const dupCountry = state.countries.filter((country)=> (country.name===action.payload.name?country:null))
        if(!dupCountry?.length){
            let countries = state.countries
            countries.push(action?.payload)
            state.countries = countries
        }
        const volatileCountries = state.volatileCountries.filter((country)=> (country.name===action.payload.name?null:country))
        state.volatileCountries = volatileCountries
        return {...state}
    }
    if(action.type==='SORT_DATA'){
        state.type='SORT_DATA'
        state.sort = action.payload.sort
        state.countries = action.payload.countries
        state.volatileCountries = action.payload.volatileCountries
        return {...state}
    }
    if(action.type==='TOGGLE_DROPDOWNBOX'){
        state.dropDownBoxFlag = !state.dropDownBoxFlag
        return {...state}
    }
    return state;
}