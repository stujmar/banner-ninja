import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

type ColorPickerProps = {
  label: string;
  onChange: (color: {label: string, value: string}) => void;
}

const ColorPicker = ({label, onChange}: ColorPickerProps) => {

  const [activeColor, setActiveColor] = useState("#DCE775");

  const handleColorChange = (color: string) => {
    setActiveColor(color);
    onChange({label: label, value: color});
  }


  return (
    <div className="bg-white p-3 border border-slate-300 rounded-md shadow-md">
      <div className="text-gray-800 font-medium text-lg font-medium">{label.slice(0,1).toUpperCase() + label.slice(1)}</div>
      <div className="w-full p-2"></div>
      <CirclePicker 
        color={activeColor}
        colors={["#999999", "#FFFFFF", "#000000", "#ff5722", "#DCE775", "#03a9f4"]}
        onChangeComplete={(color: { hex: string; }) => handleColorChange(color.hex)}
        />
    </div>
  );
}

export default ColorPicker;