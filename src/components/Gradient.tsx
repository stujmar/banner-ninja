import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

interface Payload {
  target: {
    value: string;
    name: string;
  }
}

type GradientProps = {
  attribute: string;
  label: string;
  value: string;
  onChange: (e: any) => void;
}

const Gradient = ({attribute, value, label, onChange}: GradientProps) => {
  const [popup, setPopup] = useState(false);
  const [activeColors, setActiveColors] = useState([
    { id: 1, value: "#000000" },
    { id: 2, value: "#ffffff" },
    { id: 3, value: "#000000" },
    { id: 4, value: "#ffffff" },
    { id: 5, value: "#00FF00" }
    ]);

  const handleColorChange = (e: any) => {
    setActiveColors(attribute);
    const payload = {target: {type:"property", name: attribute, value: e.hex}};
    onChange(payload);
  }


  return (
    <div className="sm:module-border w-40">
      {popup ? <button onClick={() => {setPopup(false)}} className="fixed top-0 left-0 z-30 h-screen w-screen" ></button> : null}
      <div className="text-gray-800 font-nunito font-bold">{label.slice(0,1).toUpperCase() + label.slice(1)}</div>
      <button className="w-full" onClick={() => {setPopup(!popup)}}><div style={{background: value}} className="mt-1 w-full -mb-2 h-6 rounded-lg border border-slate-400"></div></button>
      {popup ? <div className="absolute z-40"><ChromePicker
        color={value}
        onChangeComplete={(e) => handleColorChange(e)}
        /></div> : null}
    </div>
  );
}

export default Gradient;