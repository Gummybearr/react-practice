// declared to initiate states
const initState = {
    type: 'STANDBY',
    search: '', //will be updated to object when user searches
    //search object structure: {나라 이름, 알파2코드, 국제번호 등등}
    searchMode: '', //reset: clears countries list      add: clears volatileCountries list
    sort: {field: 'name', method: 'ASCENDING'}, // field means sorting field and method means 오름차순/내림차순
    countries: [], //countries searched or added by user
    dropDownBoxFlag: false, // toggles when user clicks the 'HERE' button to add countries/close box
    volatileCountries: [] //countries that might be added to countries list
}

export default (state=initState, action='') => {
    //If user searches countries, it saves 
    if(action.type==='SEARCH_DATA'){
        state.type = 'SEARCH_DATA' //type updated
        state.search = action?.payload?.search //search object will be updated
        state.searchMode = action?.payload?.searchMode //reset or add
        if(state.searchMode==='reset'){
            //For general search
            state.countries = action?.payload?.countries
        } else{
            //For individual search
            state.volatileCountries = action?.payload.countries
        }
        return {...state}
    }
    //If user clicks delete button on the right side of country block
    if(action.type==='DELETE_COUNTRY'){
        state.type='DELETE_DATA' //type updated
        const countries = state.countries.filter((country)=> (country.name===action.payload?null:country))
        state.countries = countries //redux will save all countries but the one clicked
        return {...state}
    }
    //If user clicks add button on the right side of country block
    if(action.type==='ADD_COUNTRY'){  
        //first it will search if there is any duplicate to prevent duplicacy
        const dupCountry = state.countries.filter((country)=> (country.name===action.payload.name?country:null))
        //using optional operator to prevent error calculating length of undefined
        if(!dupCountry?.length){
            //If there no duplicate, country clicked by user will by added to countries list
            let countries = state.countries
            countries.push(action?.payload)
            state.countries = countries
        }
        //Country clicked by user should be deleted from the volatileCountries list
        const volatileCountries = state.volatileCountries.filter((country)=> (country.name===action.payload.name?null:country))
        state.volatileCountries = volatileCountries
        return {...state}
    }
    //If user clicks criterias on the table such as name, alpha2Code, list will be sorted 
    if(action.type==='SORT_DATA'){
        state.type='SORT_DATA' //type update
        state.sort = action.payload.sort
        state.countries = action.payload.countries //countries will be updated
        state.volatileCountries = action.payload.volatileCountries //volatileCountries will be updated
        return {...state}
    }
    //If the user clicks the 'HERE' button
    if(action.type==='TOGGLE_DROPDOWNBOX'){
        state.dropDownBoxFlag = !state.dropDownBoxFlag //Dropbox will expand/shrink based on previous state
        return {...state}
    }
    return state; //does not really mean anything at this point, but just left it for future.
}