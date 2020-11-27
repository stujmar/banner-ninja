import React from 'react'
import { number } from './StarGame.module.css'

const ButtonNumber = ({num, onClick}) => {

    return (
        <button 
            id={num} 
            className={number}
            onClick={() => onClick(num) }>
                {num}
        </button>
    )
}

export default ButtonNumber