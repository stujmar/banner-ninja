import React, { useState, useEffect } from 'react';

const SeedPlanter = () => {
    const [ mouseX, setMouseX ] = useState(0);
    const [ mouseY, setMouseY ] = useState(0);

    useEffect(() => {
        console.log(mouseX, mouseY);
    },[mouseX,mouseY])

    const _onMouseMove = (e) => {
        setMouseX(e.pageX);
        setMouseY(e.pageY - 190);
      }

    return (
        <div className="bg-green-200 w-full h-64" onMouseMove={(e) => _onMouseMove(e)}></div>
    )
}

export default SeedPlanter