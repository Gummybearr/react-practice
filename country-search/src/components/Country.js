import React from 'react'
import { connect } from 'react-redux'

import Button from './Button'

import './Country.css'

const Country = (props) =>{
    return (
        <div className="divTableRow">
            <div className="divTableCell">{props.name}</div>
            <div className="divTableCell">{props.alpha2Code}</div>
            <div className="divTableCell">{props.callingCodes}</div>
            <div className="divTableCell">{props.capital}</div>
            <div className="divTableCell">{props.region}</div>
            {props.action==='delete'?
                <div className='divTableCell'>
                    <Button
                        text='Delete'
                        onClick={() => props.deleteCountry(props)}
                    />
                </div>:null
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCountry: (props) => {
            dispatch({type: 'DELETE_COUNTRY', payload: props.name})
        }
    }
}

export default connect(null, mapDispatchToProps)(Country);