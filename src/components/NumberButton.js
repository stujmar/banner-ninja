import React from 'react';
import { number } from './StarGame.module.css';
import Colors from '../utils/Colors';

const NumberButton = ({num, onClick, status}) => {

    return (
        <button 
            id={num} 
            className={number}
            style={{backgroundColor: Colors[status]}}
            onClick={() => onClick(num, status) }>
                {num}
        </button>
    )
}

export default NumberButton