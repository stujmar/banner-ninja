import React from 'react';

type FaderProps = {
  settings: any;
  onChange: (e: any) => void;
};

const Fader = ({settings, onChange}: FaderProps) => {
  const { attribute, label, min, max, value, step, invert } = settings;
  const handleChange = (e: any) => {
    onChange({target: {name: attribute, value: e.target.value}});
  }

  return (
    <div className="flex flex-col gap-2 sm:module-border">
      <span className="font-nunito font-bold text-left text-slate-800">{label}</span>
      <input className={invert ? "rtl" : ""} type="range" name="timeSlider" onChange={(e) => handleChange(e)} value={value} min={min} max={max} step={step}></input>
    </div>
  );
};

export default Fader;