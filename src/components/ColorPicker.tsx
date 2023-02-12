import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

interface Payload {
  target: {
    value: string;
    name: string;
  }
}

type ColorPickerProps = {
  attribute: string;
  label: string;
  value: string;
  onChange: (e: any) => void;
}

const ColorPicker = ({attribute, value, label, onChange}: ColorPickerProps) => {
  const [popup, setPopup] = useState(false);
  const [activeColor, setActiveColor] = useState(attribute);

  const handleColorChange = (e: any) => {
    setActiveColor(attribute);
    const payload = {target: {type:"property", name: attribute, value: e.hex}};
    onChange(payload);
  }


  return (
    <div className="sm:module-border w-40">
      {popup ? <button onClick={() => {setPopup(false)}} className="fixed top-0 left-0 z-30 h-screen w-screen" ></button> : null}
      <div className="text-gray-800 font-nunito font-bold">{label.slice(0,1).toUpperCase() + label.slice(1)}</div>
      <div className="w-full"></div>
      <button onClick={() => {setPopup(!popup)}}><div style={{background: value}} className="mt-1 -mb-2 w-8 h-8 rounded-full border border-slate-400"></div></button>
      {popup ? <div className="absolute z-40"><ChromePicker
        color={value}
        onChangeComplete={(e) => handleColorChange(e)}
        /></div> : null}
    </div>
  );
}

export default ColorPicker;