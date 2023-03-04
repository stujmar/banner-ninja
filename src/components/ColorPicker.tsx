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
  theme: string;
  value: string;
  onChange: (e: any) => void;
}

const ColorPicker = ({attribute, value, theme, label, onChange}: ColorPickerProps) => {
  const [popup, setPopup] = useState(false);
  const [activeColor, setActiveColor] = useState(attribute);

  const handleColorChange = (e: any) => {
    setActiveColor(attribute);
    const payload = {target: {type:"property", name: attribute, value: e.hex}};
    onChange(payload);
  }


  return (
    <div className={`sm:module-${theme}-border w-40`}>
      {popup ? <button onClick={() => {setPopup(false)}} className="fixed top-0 left-0 z-30 h-screen w-screen" ></button> : null}
      <div className={`text-${theme}-800 font-nunito font-bold`}>{label.slice(0,1).toUpperCase() + label.slice(1)}</div>
      <button className="w-full" onClick={() => {setPopup(!popup)}}><div style={{background: value}} className={`mt-1 w-full -mb-2 h-6 rounded-lg border border-${theme}-400`}></div></button>
      {popup ? <div className="absolute z-40"><ChromePicker
        color={value}
        onChange={(e) => handleColorChange(e)}
        /></div> : null}
    </div>
  );
}

export default ColorPicker;