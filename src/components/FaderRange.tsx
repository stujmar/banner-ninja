import React from 'react';

type FaderRangeProps = {
    settings: any;
    onChange: (value: any) => void;
  }

  const FaderRange = ({ settings, onChange }: FaderRangeProps) => {
    // console.log(settings);
    const handleChangeMin = (e: any) => {
      onChange({target: {type: "animation", name: `${settings.attribute}-min`, value: e.target.value}});
    }

    const handleChangeMax = (e: any) => {
      onChange({target: {type: "animation", name: `${settings.attribute}-max`, value: e.target.value}});
    }

    return (
      <div className="flex flex-col">
        <label className="font-nunito font-bold text-left text-slate-800">Min/Max</label>
        <div className="relative h-3 mt-2">
          <input className="fader-range absolute top-0 left-0" type="range" min={settings.min} max={settings.max} value={settings.animation.min} onChange={handleChangeMin}></input>
          <div 
            style={{"background": `linear-gradient(to right, #fff 0%, #fff ${settings.animation.min/settings.max * 100}%, rgb(148 163 184) ${settings.animation.min/settings.max * 100}%, rgb(148 163 184) ${((settings.animation.max - settings.min)/(settings.max - settings.min)) * 100}%, #fff 0%, #fff 100%)`}}
            className="border h-2 rounded border-slate-400"></div>
          <input className="fader-range absolute top-0 left-0" type="range" min={settings.min} max={settings.max} value={settings.animation.max} onChange={handleChangeMax}></input>
        </div>
      </div>
    );
  };

  export default FaderRange;