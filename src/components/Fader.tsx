import React from 'react';

type FaderProps = {
  label: string;
};

const Fader = ({label}: FaderProps) => {
  return (
    <div className="font-medium text-left bg-white text-slate-800 p-3 rounded-md border border-slate-300 shadow-md hover:shadow-sm hover:bg-slate-50">
      <h1 className="text-6xl font-bold text-gray-800">{label}</h1>
    </div>
  );
};

export default Fader;