import React from 'react';
import { VarXY } from './dragXY/VarXY';

type TitleProps = {
  settings: any;
  explainer: string;
  theme: string;
  // onClick: {type: string, name: string, value: boolean | { x:number, y:number } } => void;
  onClick: any
}

const Title = ({settings, theme, onClick}: TitleProps) => {
  let {isActive, text, position} = settings;
  const handleTitleChange = (e: any) => {
    onClick({type: "title", name: "isActive", value: !isActive});
  }
  const handleLocationChange = (e: any) => {
    onClick({type: "title", name: "position", value: {x: e[0], y: e[1]}});
  }

  return (
    <div className={`flex flex-col gap-2 sm:module-${theme}-border ${isActive ? "w-72" : "w-40"} transition-all overflow-hidden`}>
      <div className="flex flex-col">
        <div className="flex w-full items-end">
          <span className={`font-nunito font-bold text-left text-${theme}-800`}>Title</span>
          <span className={`ml-1 pb-1 text-xs w-max text-${theme}-400`}>(display only)</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <button onClick={handleTitleChange} className={`font-nunito font-bold whitespace-nowrap w-max mt-2 px-2 rounded shadow border text-left text-${theme}-800 hover:shadow-sm hover:bg-slate-50`}>
            toggle {settings.isActive ? "off" : "on"}
          </button>
        {settings.isActive && 
          <div className="-mt-7">
            <VarXY theme={theme} value={[position.x, position.y]} onChange={handleLocationChange}/>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Title;