import React from 'react';

type ToggleButtonProps = {
  label: string;
  explainer: string;
  theme: string;
  onClick: () => void;
}

const ToggleButton = ({label, explainer, theme, onClick}: ToggleButtonProps) => {
  return (
    <button onClick={onClick} className={`font-nunito font-bold w-40 text-left text-slate-800 sm:module-${theme}-border hover:shadow-sm hover:bg-slate-50`}>
      {label}{explainer && <span className="ml-1 text-xs text-slate-500">{explainer}</span>} 
    </button>
  );
};

export default ToggleButton;