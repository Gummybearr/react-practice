import React from 'react';

const Country = (props) =>{
    return (
        <div>
            {props.name}
            {props.alpha2Code}
            {props.callingCodes}
            {props.capital}
            {props.region}
        </div>
    )
}

export default Country;