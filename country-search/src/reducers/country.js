const initState = {
    mode: 'READ',
    welcome_content: {
        title: 'WEB',
        desc: 'Hello, WEB'
    },
    selected_content_id: 1,
    contents: [
        {
            id: 1, 
            title: 'HTML', 
            desc: 'HTML is ...'
        },
        {
            id: 2, 
            title: 'HTML', 
            desc: 'HTML is ...'
        },
        {
            id: 3, 
            title: 'HTML', 
            desc: 'HTML is ...'
        }
    ]
}

export default (state=initState, action) => {
    console.log(state);
    if(action.type==='FETCH_DATA'){
        alert('this works');
        return {...state, mode: action.mode}
    }
    return state;
}