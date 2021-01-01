import React from 'react';

const Button = (props) => {
    return (
        <div onClick={props.onClick}>
            {props.text}
        </div>
    )
}

export default Button;