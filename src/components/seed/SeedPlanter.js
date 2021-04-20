import React, { useState, useEffect } from 'react';

const SeedPlanter = () => {
    const [ mouseX, setMouseX ] = useState(0);
    const [ mouseY, setMouseY ] = useState(0);

    useEffect(() => {
        console.log(mouseX, mouseY);
    },[mouseX,mouseY])

    const _onMouseMove = (e) => {
        // console.log(e);
        setMouseX(e.nativeEvent.offsetX > 0 ? e.nativeEvent.offsetX : 0);
        setMouseY(e.nativeEvent.offsetY > 0 ? e.nativeEvent.offsetY : 0);
      }

    return (
    <div className="w-full pt-24">
        <div className="mx-auto bg-green-200 w-72 h-72" onMouseMove={(e) => _onMouseMove(e)}></div>
        <div className="border mx-auto border w-72 h-12 relative">
            <div className="absolute top-2 left-4 flex">
                <p className="mr-1 text-gray-400">mouseX:</p>
                <p>{mouseX}</p>
            </div>
            <div className="absolute left-32 top-2 flex">
                <p className="mr-1 text-gray-400">mouseY:</p>
                <p>{mouseY}</p>
            </div>

        </div>
    </div>
    )
}

export default SeedPlanter