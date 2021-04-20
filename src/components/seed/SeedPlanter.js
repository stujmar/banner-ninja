import React, { useState, useEffect } from 'react';

const SeedPlanter = () => {
    const [ mouse, setMouse] = useState({ x: 0, y: 0});
    const [ trees, setTrees ] = useState([]);
    const [ drawTrees, setDrawTrees ] = useState([]);
    const [ diameter, setDiameter ] = useState(10);

    useEffect(() => {
        // console.log(mouseX, mouseY);
    },[mouse])

    useEffect(() => {
        setDrawTrees(trees.map(tree => {
            return <div className="absolute shadow" style={{
                top: tree.y - 2, 
                left: tree.x - 2, 
                borderRadius: "50%",
                height: `${tree.diameter}px`,
                width: `${tree.diameter}px`,
                background: tree.color
                }}></div>
        }));
    },[trees])

    const _onMouseMove = (e) => {
        setMouse({
            x:e.nativeEvent.offsetX > 0 ? e.nativeEvent.offsetX : 0,
            y:e.nativeEvent.offsetY > 0 ? e.nativeEvent.offsetY : 0
        })
      }

    const handleDiameter = (e) => {
        setDiameter(e.target.value);
    }

    const plant = (e) => {
        console.log(`tree planted at ${mouse.x}, ${mouse.y}`)
        setTrees(trees => [...trees, {
            x: mouse.x,
            y: mouse.y,
            diameter: diameter ? diameter : 2,
            age: diameter ? diameter : 2,
            color: "rgb(50, 200, 50)"
        }])
    }

    return (
    <div value={diameter} className="w-full pt-24" onChange={(e) => handleDiameter(e)}>
    {`Diameter: `}
        <input className="border mb-2" type="number" />
        <div className="mx-auto bg-green-200 w-72 h-72 relative overflow-hidden" 
            onMouseMove={(e) => _onMouseMove(e)}
            onClick={(e) => plant(e)}
            >{drawTrees}</div>
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