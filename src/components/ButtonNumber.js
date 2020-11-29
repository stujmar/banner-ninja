import React from 'react'
import { number } from './StarGame.module.css'
import Colors

const ButtonNumber = ({num, onClick}) => {

    return (
        <button 
            id={num} 
            className={number}
            style={backgroundColor: }
            onClick={() => onClick(num) }>
                {num}
        </button>
    )
}

export default ButtonNumber