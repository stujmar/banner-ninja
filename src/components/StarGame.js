import React, { useEffect, useState } from 'react'
import Utils from '../utils/Utils';
import {number, left, body, right, game, help } from './StarGame.module.css';
import NumberButton from './NumberButton.js'
import StarGrid from './StarGrid';

const StarGame = () => {
    // Starting star count to guess.
    const [stars, setStars] = useState(Utils.random(1,9));
    // Numbers that have yet to be guessed.
    const [available, setAvailable] = useState(Utils.range(1,9));
    // Numbers in play which we are checking.
    const [candidates, setCandidate] = useState([]);
    // Time Left
    const [timeLeft, setTimeLeft] = useState(10);
    // setInterval, setTimeout


    const candidatesAreWrong = Utils.sum(candidates) > stars;
    const gameIdWon = available.length === 0;
    const gameIsLost = timeLeft === 0;


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
        if (timeLeft > 0) {
            const timerID = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000)
            return () => clearTimeout(timerID);
        }

    })

    const handleClick = (num, status) => {
        console.log(num, status);
        if (status === 'used') {
            return;
        }   
        
        const newCandidates = status === 'available' ? candidates.concat(num) : candidates.filter(cn => cn !== num); 
        if (Utils.sum(newCandidates) !== stars) {
            setCandidate(newCandidates);
        } else {
            const newAvaiable = available.filter( n => !newCandidates.includes(n));
            setStars((Utils.randomSumIn(newAvaiable, 9)));
            setCandidate([]);
            setAvailable(newAvaiable);
        }
    };

    const handleReset = () => {
        setStars(Utils.random(1,9));
        setAvailable(Utils.range(1,9));
        setCandidate([]);
        setTimeLeft(10);
    }


    return (
        <div className={game}>Stars!
            <div className={help}>
                Pick one or more numbers that sum to the number of Stars.
            </div>
            {gameIsLost ? "Time's Up": "Time is Ticking"}
            <div className={body}>
                <div className={left}>
                    <StarGrid starCount={stars}/>
                </div>
                <div className={right}>
                    {Utils.range(1,9).map(num =>
                        <NumberButton 
                            key={num} 
                            id={num} 
                            num={num} 
                            status={numStatus(num)}
                            className={number} 
                            onClick={handleClick}/>
                    )}
                </div>
            </div>
                <p>Time Remaining: {timeLeft}</p>
                <button onClick={handleReset}>{gameIdWon ? "PLAY AGAIN" : "RESET"}</button>
        </div>
    )
}

export default StarGame