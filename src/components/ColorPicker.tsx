import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

type ColorPickerProps = {
  onChange: (color: string) => void;
}

const ColorPicker = ({onChange}: ColorPickerProps) => {

  const [activeColor, setActiveColor] = useState("#DCE775");

  const handleColorChange = (color: string) => {
    setActiveColor(color);
    onChange(color);
  }


  return (
    <div className="bg-gray-50 p-3 rounded-xl shadow-lg">
      <div className="text-gray-800 font-medium text-lg font-medium">Background</div>
      <div className="w-full p-2"></div>
      <CirclePicker 
        color={ activeColor}
        colors={["#999999", "#FFFFFF", "#000000", "#ff5722", "#DCE775", "#03a9f4"]}
        onChangeComplete={(color: { hex: string; }) => handleColorChange(color.hex)}
        />
    </div>
  );
}

export default ColorPicker;