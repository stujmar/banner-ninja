import React, { useState } from 'react';

type FaderProps = {
  settings: any;
  onChange: (e: any) => void;
};

const Fader = ({settings, onChange}: FaderProps) => {
  const [aniActive, setAniActive] = useState<boolean>(settings.isAnimated ? settings.animation.isActive : false);
  const { attribute, label, min, max, value, step, invert } = settings;
  
  const handlePropertyChange = (e: any) => {
    onChange({target: {type: "property", name: attribute, value: e.target.value}});
  }
  const handleAniChange = (e: any) => {
    onChange({target: {type: "animation", name: e.target.name, value: e.target.value}});
  }

  const toggleIsAnimated = () => {
    setAniActive(!aniActive);
  }

  return (
    <div className="flex flex-col gap-2 sm:module-border">
      <div className="flex justify-between items-center">
        <span className="font-nunito font-bold text-left text-slate-800">{label}</span>
        {settings.isAnimated && 
          <button onClick={toggleIsAnimated}>
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              className={`w-5 h-5 curson-pointer ${aniActive ? "text-slate-800" : "text-slate-400"}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg></button>}

      </div>
      {settings.isAnimated && aniActive ?  
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-between items-start">
            <span className="font-nunito font-bold text-left text-slate-800">Min</span>
            <input className={invert ? "rtl" : ""} type="range" name={`${attribute}-min`} onChange={(e) => handleAniChange(e)} value={settings.animation.min} min={min} max={max} step={step}></input>
          </div>
          <div className="flex flex-col justify-between items-start">
            <span className="font-nunito font-bold text-left text-slate-800">Max</span>
            <input className={invert ? "rtl" : ""} type="range" name={`${attribute}-max`} onChange={(e) => handleAniChange(e)} value={settings.animation.max} min={min} max={max} step={step}></input>
          </div>
        </div>
      :
      <input className={invert ? "rtl" : ""} type="range" name="timeSlider" onChange={(e) => handlePropertyChange(e)} value={value} min={min} max={max} step={step}></input>}
    </div>
  );
};

export default Fader;