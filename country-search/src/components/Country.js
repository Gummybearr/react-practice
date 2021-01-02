import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

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
                </div>:<div className='divTableCell'>
                    <Button
                        text='Add'
                        onClick={()=> props.addCountry(props)}
                    />
                </div>
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCountry: (props) => {
            dispatch({type: 'DELETE_COUNTRY', payload: props.name})
        },
        addCountry: (props) => {
            dispatch({type:'ADD_COUNTRY', payload: props})
        }
    }
}

export default connect(null, mapDispatchToProps)(Country);