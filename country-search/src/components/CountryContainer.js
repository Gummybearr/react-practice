import React, {useEffect} from 'react'
import { connect } from 'react-redux'

const CountryContainer = (props) =>{
    let list = [];
    console.log('new update');
    return (
        <div onClick={() => {
            console.log(props);
        }}>
            {props.content}
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        data: state.content
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log(dispatch)
    return {
        fetchCountries: () => dispatch()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryContainer);