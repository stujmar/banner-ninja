import React from 'react';
import { VarXY } from './dragXY/VarXY';

type TitleProps = {
  value: boolean;
  explainer: string;
  theme: string;
  onClick: () => void;
}

const Title = ({value, theme, onClick}: TitleProps) => {
  return (
    <div className={`flex flex-col gap-2 sm:module-${theme}-border ${value ? "w-80" : "w-40"} transition-all overflow-hidden h-24`}>
      <div className="flex flex-col">
        <div className="flex w-full items-end">
          <span className={`font-nunito font-bold text-left text-${theme}-800`}>Title</span>
          <span className={`ml-1 pb-1 text-xs w-max text-${theme}-400`}>(display only)</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <button onClick={onClick} className={`font-nunito font-bold whitespace-nowrap w-max mt-2 px-2 rounded shadow border text-left text-${theme}-800 hover:shadow-sm hover:bg-slate-50`}>
            toggle {value ? "off" : "on"}
          </button>
        {value && 
          <div className="-mt-7">
            <VarXY theme={theme} />
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Title;