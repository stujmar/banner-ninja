import React, { useState, useEffect } from 'react';

const SeedPlanter = () => {
    const [ mouse, setMouse] = useState({ x: 0, y: 0});

    useEffect(() => {
        // console.log(mouseX, mouseY);
    },[mouse])

    const _onMouseMove = (e) => {
        setMouse({
            x:e.nativeEvent.offsetX > 0 ? e.nativeEvent.offsetX : 0,
            y:e.nativeEvent.offsetY > 0 ? e.nativeEvent.offsetY : 0
        })
      }

    const plant = (e) => {
        console.log(`tree planted at ${mouse.x}, ${mouse.y}`)
    }

    return (
    <div className="w-full pt-24">
        <div className="mx-auto bg-green-200 w-72 h-72" 
            onMouseMove={(e) => _onMouseMove(e)}
            onClick={(e) => plant(e)}
            ></div>
        <div className="border mx-auto border w-72 h-12 relative">
            <div className="absolute top-2 left-4 flex">
                <p className="mr-1 text-gray-400">mouseX:</p>
                <p>{mouse.x}</p>
            </div>
            <div className="absolute left-32 top-2 flex">
                <p className="mr-1 text-gray-400">mouseY:</p>
                <p>{mouse.y}</p>
            </div>

        </div>
    </div>
    )
}

export default SeedPlanter