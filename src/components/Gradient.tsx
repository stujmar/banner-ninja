import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

type GradientProps = {
  attribute: string;
  label: string;
  value: any[];
  onChange: (e: any) => void;
}

const Gradient = ({attribute, value, label, onChange}: GradientProps) => {
  const [popup, setPopup] = useState(false);
  const [activeColor, setActiveColor] = useState(0);
  const [colorCount, setColorCount] = useState(5);

  const handleColorChange = (e: any) => {
    let newColors = value.map((color: any) => {
      if (color.id === activeColor) {
        return {id: color.id, value: e.hex};
      } else {
        return color;
      }
    })
    const payload = {target: {type:"property", name: attribute, value: newColors}};
    onChange(payload);
  }

  const handlePopUp = (num: number) => {
    setActiveColor(num);
    setPopup(!popup);
  }

  return (
    <div className="sm:module-border w-40">
      {popup ? <button onClick={() => {setPopup(false)}} className="fixed top-0 left-0 z-30 h-screen w-screen" ></button> : null}
      <div className="text-gray-800 font-nunito font-bold">{label.slice(0,1).toUpperCase() + label.slice(1)}</div>
      <div className="flex items-start">
        <button className="mt-1 w-3/12 -mb-2 h-6 rounded-l-lg border border-slate-400 border-r-none" style={{background: value[0].value}} onClick={() => {handlePopUp(1)}}></button>
        <button className="mt-1 w-3/12 -mb-2 h-6 border border-slate-400 border-r-none" style={{background: value[1].value}} onClick={() => {handlePopUp(2)}}></button>
        <button className="mt-1 w-3/12 -mb-2 h-6 border border-slate-400 border-r-none" style={{background:  value[2].value}} onClick={() => {handlePopUp(3)}}></button>
        <button className="mt-1 w-3/12 -mb-2 h-6 border border-slate-400 border-r-none" style={{background:  value[3].value}} onClick={() => {handlePopUp(4)}}></button>
        <button className="mt-1 w-3/12 -mb-2 h-6 rounded-r-lg border border-slate-400 border-r-none" style={{background:  value[4].value}} onClick={() => {handlePopUp(5)}}></button>
        <select className="mt-1" name="color-count" id="color-count">
            <option value="3">3</option>
          <option value="5">5</option>
        </select>
      </div>
      {popup ? <div className="absolute z-40"><ChromePicker
        color={value[activeColor-1].value}
        onChangeComplete={(e) => handleColorChange(e)}
        /></div> : null}
    </div>
  );
}

export default Gradient;