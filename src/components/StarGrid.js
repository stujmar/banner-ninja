import React from 'react'
import Utils from '../utils/utils';
import {star} from './StarGame.module.css'

const StarGrid = ({starCount}) => {
    
    return (
        <>
                    {Utils.range(1,starCount).map(starId => 
                        <div id={starId} key={starId} className={star} />
                    )}

        </>
    )
}

export default StarGrid