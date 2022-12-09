import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

interface Payload {
  target: {
    value: string;
    name: string;
  }
}

type ColorPickerProps = {
  attribute: string;
  label: string;
  onChange: (color: {label: string, value: string}) => void;
}

const ColorPicker = ({attribute, label, onChange}: ColorPickerProps) => {

  const [activeColor, setActiveColor] = useState("#DCE775");

  const handleColorChange = (e: any) => {
    // setActiveColor(color);
    const changePayload: Payload = {target: {name: attribute, value: e.hex}};
    onChange(changePayload);
  }


  return (
    <div className="bg-white p-3 border border-slate-300 rounded-md shadow-md">
      <div className="text-gray-800 font-medium text-lg font-medium">{label.slice(0,1).toUpperCase() + label.slice(1)}</div>
      <div className="w-full p-2"></div>
      <CirclePicker 
        color={activeColor}
        colors={["#999999", "#FFFFFF", "#000000", "#ff5722", "#DCE775", "#03a9f4"]}
        onChangeComplete={(e) => handleColorChange(e)}
        />
    </div>
  );
}

export default ColorPicker;