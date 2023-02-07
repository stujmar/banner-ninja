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
  const toggleIsAnimated = () => {
    console.log(label, "toggleIsAnimated")
  }

  return (
    <div className="flex flex-col gap-2 sm:module-border">
      <div className="flex justify-between items-center">
        <span className="font-nunito font-bold text-left text-slate-800">{label}</span>
        {settings.isAnimated && <button onClick={toggleIsAnimated}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 curson-pointer text-slate-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg></button>}

      </div>
      <input className={invert ? "rtl" : ""} type="range" name="timeSlider" onChange={(e) => handleChange(e)} value={value} min={min} max={max} step={step}></input>
    </div>
  );
};

export default Fader;