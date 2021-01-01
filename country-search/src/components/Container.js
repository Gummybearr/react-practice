import React from 'react'

const Container = (props) =>{
    return (
        <div onClick={() => {
            console.log('container ok');
        }}>
            {props.content}
        </div>
    )
}

export default Container;