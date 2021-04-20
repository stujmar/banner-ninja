import React, { useState, useEffect } from 'react';

const SeedPlanter = () => {
    const [ mouseX, setMouseX ] = useState(0);
    const [ mouseY, setMouseY ] = useState(0);

    useEffect(() => {
        console.log(mouseX, mouseY);
    },[mouseX,mouseY])

    const _onMouseMove = (e) => {
        // console.log(e);
        setMouseX(e.nativeEvent.offsetX);
        setMouseY(e.nativeEvent.offsetY);
      }

    return (
    <div className="w-full pt-24">
        <div className="mx-auto bg-green-200 w-72 h-72" onMouseMove={(e) => _onMouseMove(e)}></div>
    </div>
    )
}

export default SeedPlanter