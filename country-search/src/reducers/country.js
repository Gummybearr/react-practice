const initState = {
    type: 'STANDBY',
    content: []
}

export default (state=initState, action) => {
    if(action.type==='FETCH_DATA'){
        state.type = 'FETCH_DATA'
        state.content = action?.payload
        return {...state, mode: action.payload}
    }
    return state;
}