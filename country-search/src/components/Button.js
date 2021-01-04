import React from 'react';

//Button that gets function as property and enables it when clicked
const Button = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

export default Button;