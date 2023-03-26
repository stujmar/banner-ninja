import React, { useState } from 'react';
import FaderRange from './FaderRange';
import ClockIcon from './icons/ClockIcon';

type FaderSpreadProps = {
  settings: any;
  onChange: (e: any) => void;
  base?: boolean;
  theme: string;
};

const FaderSpread = ({settings, onChange, base, theme}: FaderSpreadProps) => {
  const [aniActive, setAniActive] = useState<boolean>(settings.isAnimated ? settings.animation.isActive : false);
  const { attribute, label, min, max, value, step, spread } = settings;
  
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
    onChange({target: {type: base ? "base" : "property", name: attribute, value: parseFloat(e.target.value)}});
  }
  const handleAniChange = (e: any) => {
    onChange({target: {type: "animation", name: e.target.name, value: e.target.value}});
  }

  const toggleIsAnimated = () => {
    onChange({target: {type: "animation", name: `${attribute}-isActive`, value: !aniActive}});
    setAniActive(!aniActive);
  }

  const getHeight = () => {
    let height = 64;
    if (settings.isAnimated) {
      height += 16;
    }
    if (value > 1) {
      height += 64;
    }
    return `${height}px`;
  }

  return (
    <div style={{height: getHeight()}} className={`flex flex-col gap-2 sm:module-${theme}-border w-40 transition-all overflow-hidden ${getHeight()}`}>
      <div className="flex justify-between items-center">
          <span className={`font-nunito font-bold text-left text-${theme}-800`}>{label}</span>
          {settings.isAnimated && <button><svg 
              xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              className={`w-5 h-5 curson-pointer ${aniActive ? `text-${theme}-400` : `text-${theme}-600`}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg></button>}
        {settings.isAnimated && 
          <button onClick={toggleIsAnimated}>
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              className={`w-5 h-5 curson-pointer ${aniActive ? `text-${theme}-400` : `text-${theme}-600`}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg></button>}
      </div>
      <input
          style={{background: `linear-gradient(to right, ${getThemeColor()} 0%, ${getThemeColor()} ${((value - min)/(max - min)) * 100}%, #fff 0%, #fff 100%)`}}
          type="range" name="timeSlider" className={`${theme}`}
          onChange={(e) => handlePropertyChange(e)} value={value} min={min} max={max} step={step}></input>
      {value > 1 &&  
        <div>
          <div className="flex justify-between mt-2">
            <span className={`font-nunito font-bold text-left text-${theme}-800`}>Spread</span>
            {settings.spread.isAnimated && <button><ClockIcon isActivated={false} theme={theme}/></button>}
          </div>
          <input
          style={{background: `linear-gradient(to right, ${getThemeColor()} 0%, ${getThemeColor()} ${((value - min)/(max - min)) * 100}%, #fff 0%, #fff 100%)`}}
          type="range" name="timeSlider" className={`${theme}`}
          onChange={(e) => handlePropertyChange(e)} value={value} min={min} max={max} step={step}></input>
        </div>}
    </div>
  );
};

export default FaderSpread;