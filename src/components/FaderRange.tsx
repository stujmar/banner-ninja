import React from 'react';

type FaderRangeProps = {
    settings: any;
    onChange: (value: any) => void;
  }

  const FaderRange = ({ settings, onChange }: FaderRangeProps) => {
    const handleChangeMin = (e: any) => {
      onChange({target: {type: "animation", name: `${settings.attribute}-min`, value: parseFloat(e.target.value)}});
    }

    const handleChangeMax = (e: any) => {
      onChange({target: {type: "animation", name: `${settings.attribute}-max`, value: parseFloat(e.target.value)}});
    }

    let firstPosition = ((settings.animation?.min)/(settings.max)) * 100;
    let secondPosition = ((settings.animation?.max - settings.min)/(settings.max - settings.min)) * 100;
    if (settings.animation?.min > settings.animation?.max) {
      let temp = firstPosition;
      firstPosition = secondPosition;
      secondPosition = temp;
    }

    return (
      <div className="flex flex-col">
        <label className="font-nunito font-bold text-left text-slate-800">Min/Max</label>
        <div className="relative h-3 mt-2">
          <input className="fader-range absolute top-0 left-0" type="range" min={settings.min} max={settings.max} value={settings.animation?.min} onChange={handleChangeMin}></input>
          <div 
            style={{"background": `linear-gradient(to right, #fff ${firstPosition}%, rgb(148 163 184) ${firstPosition}%, rgb(148 163 184) ${secondPosition}%, #fff 0%, #fff 100%)`}}
            className="border h-2 rounded border-slate-400"></div>
          <input className="fader-range absolute top-0 left-0" type="range" min={settings.min} max={settings.max} value={settings.animation?.max} onChange={handleChangeMax}></input>
        </div>
      </div>
    );
  };

  export default FaderRange;