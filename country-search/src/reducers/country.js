const initState = {
    type: 'STANDBY',
    countries: []
}

export default (state=initState, action='') => {
    if(action.type==='SEARCH_DATA'){
        state.type = 'SEARCH_DATA'
        state.countries = action?.payload
        return {...state, countries: action.payload}
    }
    if(action.type==='DELETE_COUNTRY'){
        console.log(action?.payload)
        const countries = state.countries.filter((country)=> (country.name===action.payload?null:country))
        state.countries = countries
        return {...state}
    }
    return state;
}