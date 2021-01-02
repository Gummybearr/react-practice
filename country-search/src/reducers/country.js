import actions from "redux-form/lib/actions"

const initState = {
    type: 'STANDBY',
    search: '',
    sort: {field: 'name', method: 'ASCENDING'},
    countries: []
}

export default (state=initState, action='') => {
    if(action.type==='SEARCH_DATA'){
        state.type = 'SEARCH_DATA'
        state.search = action?.payload?.search
        state.countries = action?.payload?.countries
        return {...state, countries: action.payload.countries}
    }
    if(action.type==='DELETE_COUNTRY'){
        console.log(action?.payload)
        state.type='DELETE_DATA'
        const countries = state.countries.filter((country)=> (country.name===action.payload?null:country))
        state.countries = countries
        return {...state}
    }
    if(action.type==='SORT_DATA'){
        state.type='SORT_DATA'
        state.sort = action.payload.sort
        state.countries = action.payload.countries
        return {...state}
    }
    return state;
}