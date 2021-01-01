import React, {useEffect} from 'react'
import { connect } from 'react-redux'



const CountryContainer = (props) =>{
    return (
        <div onClick={() => {
            console.log('container ok');
        }}>
            {props.content}
        </div>
    )
}

export default CountryContainer;