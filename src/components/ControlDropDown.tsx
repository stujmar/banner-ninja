import React, {useState, useEffect } from 'react';

type ControlDropDownProps = {
  settings: any;
  onChange: (e: any) => void;
};

const ControlDropDown = ({settings, onChange}: ControlDropDownProps) => {
  const [options, setOptions] = useState<any>([]);
  const { attribute, label, min, max, value, step, invert } = settings;

  const handleChange = (e: any) => {
    onChange({target: {name: attribute, value: e.target.value}});
  }

  useEffect(() => {
    setOptions(
        settings.options.map((link: any) => {
        return <option key={options.value} value={options.value}>{options.value}</option>;
      }))
  }, []);

  return (
    <div className="flex flex-col gap-2 sm:module-border">
      <span className="font-nunito font-bold text-left text-slate-800">{label}</span>
      <select>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  );
};

export default ControlDropDown;