import React, { useState } from 'react';
import { BlockPicker } from 'react-color';

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
    <BlockPicker 
      color={ activeColor}
      onChangeComplete={(color: { hex: string; }) => handleColorChange(color.hex)}
    />
  );
}

export default ColorPicker;