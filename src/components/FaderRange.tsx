import React from 'react';

type FaderRangeProps = {
    settings: any;
    onChange: (value: any) => void;
  }

  const FaderRange = ({ settings, onChange }: FaderRangeProps) => {
    console.log(settings);
    const handleChangeMin = (e: any) => {
      onChange({target: {type: "min", value: e.target.value}});
    }

    const handleChangeMax = (e: any) => {
      onChange({target: {type: "max", value: e.target.value}});
    }

    return (
      <div>
        <input type="range" min={settings.min} max={settings.max} value={settings.animation.min} onChange={handleChangeMin} />
        <input type="range" min={settings.min} max={settings.max} value={settings.animation.max} onChange={handleChangeMax} />
      </div>
    );
  };

  export default FaderRange;