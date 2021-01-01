import React from 'react'
import Button from './Button'

const Country = (props) =>{
    return (
        <div>
            {props.name}
            {props.alpha2Code}
            {props.callingCodes}
            {props.capital}
            {props.region}
            <Button
                text='Delete'
                onClick={() => (alert('clicked it'))}
            />
        </div>
    )
}

export default Country;