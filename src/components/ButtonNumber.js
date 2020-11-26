import React from 'react'

const ButtonNumber = ({num}) => {

    return (
        <button key={num} id={num} className={number}>{num}</button>
    )
}

export default ButtonNumber