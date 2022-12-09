import React from 'react';

type FaderProps = {
  label: string;
  min: number;
  max: number;
  value: number;
  step: number;
  onChange: (e: any) => void;
};

const Fader = ({label, min, max, value, step, onChange}: FaderProps) => {

  const handleChange = (e: any) => {
    onChange(e);
  }

  return (
    <div className="flex flex-col gap-2 bg-white p-3 rounded-md border border-slate-300 shadow-md">
      <span className="font-medium text-left text-slate-800">{label}</span>
      <input type="range" name="timeSlider" onChange={(e) => handleChange(e)} value={value} min={min} max={max} step={step}></input>
    </div>
  );
};

export default Fader;