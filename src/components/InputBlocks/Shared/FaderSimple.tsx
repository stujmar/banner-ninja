import React, { useState } from 'react';
import FaderRange from './FaderRange';

type FaderSimpleProps = {
  onChange: (e: any) => void;
  setting: any;
  label: string;
  theme: string;
};

const FaderSimple = ({onChange, setting, label, theme}: FaderSimpleProps) => {
  const [aniActive, setAniActive] = useState(false);
  let isAnimated = false;
  let min = 0;
  let max = 10
  let step;
  let value = 5;
  let settings = {
    isAnimated: false,
    min: 0,
    max: 1,
    rate: 1,
    step: 0.01,
    animation: {rate: 1, min: 0, max: 1, isActive: false},
  };
  const getThemeColor = () => {
    switch (theme) {
      case "slate": // slate-400
        return "#94a3b8";
      case "stone": // stone-400
        return "#a8a29e";
      case "cosmic": // Indigo-400
        return "#818cf8";
    }
  };

  const handlePropertyChange = (e: any) => {
    onChange({target: {type: "property", name: label, value: parseFloat(e.target.value)}});
  }
  const handleAniChange = (e: any) => {
    onChange({target: {type: "animation", name: e.target.name, value: e.target.value}});
  }

  const toggleIsAnimated = () => {
    onChange({target: {type: "animation", name: `${label}-isActive`, value: !aniActive}});
    setAniActive(!aniActive);
  }

  return (
    <div className={`flex flex-col gap-2 w-40 transition-all overflow-hidden ${false ? "h-[136px]":"h-12"}`}>
      <div className="flex justify-between items-center">
        <span className={`font-nunito font-bold text-left text-${theme}-800`}>{label}</span>
        {isAnimated && 
          <button onClick={toggleIsAnimated}>
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              className={`w-5 h-5 curson-pointer ${aniActive ? `text-${theme}-700` : `text-${theme}-400`}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg></button>}
      </div>
      {(isAnimated && aniActive)
        || <input
          style={{background: `linear-gradient(to right, ${getThemeColor()} 0%, ${getThemeColor()} ${((value - min)/(max - min)) * 100}%, #fff 0%, #fff 100%)`}}
          type="range" name="timeSlider" className={`${theme}`}
          onChange={(e) => handlePropertyChange(e)} value={value} min={min} max={max} step={step}></input>}
      <div className={`${!aniActive ? "" : "transition ease-in duration-300"} ${isAnimated && aniActive ? "opacity-100":"opacity-0"}`}>
        <FaderRange settings={settings} theme={theme} onChange={handleAniChange} />
        <div className={`flex flex-col gap-2`}>
          <div className="flex flex-col mt-1 justify-between items-start">
            <span className={`font-nunito font-bold text-left text-${theme}-800`}>Rate</span>
            <input
              style={{background: `linear-gradient(to right, rgb(148 163 184) 0%, rgb(148 163 184) ${(settings.animation?.rate/10) * 100}%, #fff 0%, #fff 100%)`}}
              className={`${theme}`} type="range" name={`${label}-rate`} onChange={(e) => handleAniChange(e)} value={settings.animation?.rate} min={1} max={10} step={0.05}></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaderSimple;