import React from 'react';

type ToggleButtonProps = {
  label: string;
  explainer: string;
  onClick: () => void;
}

const ToggleButton = ({label, explainer, onClick}: ToggleButtonProps) => {
  return (
    <button onClick={onClick} className="font-nunito font-bold text-left bg-white text-slate-800 p-3 rounded-md border border-slate-300 shadow-md hover:shadow-sm hover:bg-slate-50">
      {label}{explainer && <span className="ml-1 text-xs text-slate-500">{explainer}</span>} 
    </button>
  );
};

export default ToggleButton;