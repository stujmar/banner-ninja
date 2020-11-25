import React, { useEffect } from 'react'
import Utils from '../utils/Utils';
import Colors from '../utils/Colors';
import Styles, {star} from './StarGame.module.css';

const StarGame = () => {

    const stars = 5;

    useEffect(() => {
        console.log('Hello from the Star Game');
        console.log(Colors.available);
    },[])

    return (
        <div className="game">Stars!
            <div className="help">
                Pick one or more numbers that sum to the number of stars.
                {Utils.range(1,5)}
            </div>
            <div className="body">
                <div className="left">
                    {Utils.range(1,stars).map(starId => 
                        <div className={star} />    
                    )}
                    {/* <div className="star" />
                    <div className="star" />
                    <div className="star" />
                    <div className="star" />
                    <div className="star" />
                    <div className="star" />
                    <div className="star" />
                    <div className="star" />
                    <div className="star" /> */}
                </div>
                <div className="right">
                    <button className="number">1</button>
                    <button className="number">2</button>
                    <button className="number">3</button>
                    <button className="number">4</button>
                    <button className="number">5</button>
                    <button className="number">6</button>
                    <button className="number">7</button>
                    <button className="number">8</button>
                    <button className="number">9</button>
                </div>
            </div>
        
        </div>
    )
}



export default StarGame