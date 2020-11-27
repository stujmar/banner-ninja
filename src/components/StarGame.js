import React, { useEffect, useState } from 'react'
import Utils from '../utils/Utils';
import Colors from '../utils/Colors';
import {star, number, left, body, right, game, help } from './StarGame.module.css';
import ButtonNumber from './ButtonNumber.js'

const StarGame = () => {
    const [stars, setStars] = useState(Utils.random(1,9));
    
    useEffect(() => {
        console.log('Hello from the Star Game');
        console.log(Colors.available);
    },[])

    return (
        <div className={game}>Stars!
            <div className={help}>
                Pick one or more numbers that sum to the number of stars.
                {Utils.range(1,5)}
            </div>
            <div className={body}>
                <div className={left}>
                    {Utils.range(1,stars).map(starId => 
                        <div id={starId} key={starId} className={star} />
                    )}
                </div>
                <div className={right}>
                    {Utils.range(1,9).map(num =>
                        <ButtonNumber key={num} id={num} num={num} className={number} />
                    )}
                </div>
            </div>
        
        </div>
    )
}

export default StarGame