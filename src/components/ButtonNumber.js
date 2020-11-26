import React from 'react'
import { number } from './StarGame.module.css'

const ButtonNumber = ({num}) => {

    return (
        <button id={num} className={number}>{num}</button>
    )
}

export default ButtonNumber