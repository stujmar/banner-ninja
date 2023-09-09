import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

type GradientProps = {
  attribute: string;
  label: string;
  theme: string;
  colors: any[];
  onChange: (e: any) => void;
}

const Gradient = ({attribute, colors, theme, label, onChange}: GradientProps) => {
  const [popup, setPopup] = useState(false);
  const [activeColor, setActiveColor] = useState(0);
  const [colorCount, setColorCount] = useState(5);

  const handleColorChange = (e: any) => {
    let newColors = colors.map((color: any) => {
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
    <div className={`sm:module-${theme}-border w-40`}>
      {popup ? <button onClick={() => {setPopup(false)}} className="fixed top-0 left-0 z-30 h-screen w-screen" ></button> : null}
      <div className={`text-${theme}-800 font-nunito font-bold`}>{label.slice(0,1).toUpperCase() + label.slice(1)}</div>
      <div 
        className={`flex gap-2 items-center mt-1 p-2 border border-${theme}-400 rounded-lg`}
        style={{background: `linear-gradient(90deg, ${colors[0].value} 5%, ${colors[1].value} 30%, ${colors[2].value} 50%, ${colors[3].value} 70%, ${colors[4].value} 95%)`}}>
        <button className="w-6 h-4 rounded-full border border-slate-200 gradient-hover" style={{background: colors[0].value}} onClick={() => {handlePopUp(1)}}></button>
        <button className="w-6 h-4 rounded-full border border-slate-200 gradient-hover" style={{background: colors[1].value}} onClick={() => {handlePopUp(2)}}></button>
        <button className="w-6 h-4 rounded-full border border-slate-200 gradient-hover" style={{background: colors[2].value}} onClick={() => {handlePopUp(3)}}></button>
        <button className="w-6 h-4 rounded-full border border-slate-200 gradient-hover" style={{background: colors[3].value}} onClick={() => {handlePopUp(4)}}></button>
        <button className="w-6 h-4 rounded-full border border-slate-200 gradient-hover" style={{background: colors[4].value}} onClick={() => {handlePopUp(5)}}></button>
      </div>
        {/* <select className="mt-1" name="color-count" id="color-count">
            <option value="3">3</option>
          <option value="5">5</option>
        </select> */}
      {popup ? <div className="absolute z-40"><ChromePicker
        color={colors[activeColor-1].value}
        onChangeComplete={(e) => handleColorChange(e)}
        /></div> : null}
    </div>
  );
}

export default Gradient;