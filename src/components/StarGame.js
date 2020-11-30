import React, { useEffect, useState } from 'react'
import Utils from '../utils/Utils';
import Colors from '../utils/Colors';
import {number, left, body, right, game, help } from './StarGame.module.css';
import ButtonNumber from './ButtonNumber.js'
import StarGrid from './StarGrid';

const StarGame = () => {
    const [stars, setStars] = useState(Utils.random(1,9));
    const [available, setAvailable] = useState([1,2,3,4,5,6,7]);
    const [candidates, setCandidate] = useState([2,3]);

    const candidatesAreWrong = Utils.sum(candidates) > stars;
  

    const numStatus = (number) => {
        if (!available.includes(number)) {
            return 'used';
        }
        if(candidates.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    };

    useEffect(() => {
        console.log('Hello from the Great Star Game');
        console.log(Colors);
    },[])

    const handleClick = (num, status) => {
        console.log(num, status);
        if (status = 'used') {
            return;
        }   
        const newCandidates = candidates.concat(num); 
        if (Utils.sum(newCandidates) !== stars) {
            setCandidate(newCandidates);
        } else {
            const newAvaiable = available.filter( n => !newCandidates.includes(n));
            setStars((Utils.randomSumIn(newAvaiable, 9)));
            setCandidate([]);
            setAvailable(newAvaiable);

        }
    };

    return (
        <div className={game}>Stars!
            <div className={help}>
                Pick one or more numbers that sum to the number of Stars.
                {Utils.range(1,5)}
            </div>
            <div className={body}>
                <div className={left}>
                    <StarGrid starCount={stars}/>
                </div>
                <div className={right}>
                    {Utils.range(1,9).map(num =>
                        <ButtonNumber 
                            key={num} 
                            id={num} 
                            num={num} 
                            status={numStatus(num)}
                            className={number} 
                            onClick={handleClick}/>
                    )}
                </div>
            </div>
        
        </div>
    )
}

export default StarGame