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
  value: string;
  onChange: (e: any) => void;
}

const ColorPicker = ({attribute, value, label, onChange}: ColorPickerProps) => {

  const [activeColor, setActiveColor] = useState(attribute);

  const handleColorChange = (e: any) => {
    setActiveColor(attribute);
    const payload = {target: {name: attribute, value: e.hex}};
    onChange(payload);
  }


  return (
    <div className="sm:module-border">
      <div className="text-gray-800 font-nunito font-bold text-lg">{label.slice(0,1).toUpperCase() + label.slice(1)}</div>
      <div className="w-full p-2"></div>
      <CirclePicker 
        color={value}
        colors={["#999999", "#FFFFFF", "#000000", "#ff5722", "#DCE775", "#03a9f4"]}
        onChangeComplete={(e) => handleColorChange(e)}
        />
    </div>
  );
}

export default ColorPicker;