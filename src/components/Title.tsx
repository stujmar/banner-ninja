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
    <div className={`flex flex-col gap-2 sm:module-${theme}-border ${isActive ? "w-40" : "w-40"} transition-all overflow-hidden`}>
      <div className="flex flex-col">
        <div className="flex w-full items-end justify-between">
          <span className={`font-nunito font-bold text-left text-${theme}-800`}>Title</span>
          {/* <span className={`ml-1 pb-1 text-xs w-max text-${theme}-400`}>(display only)</span> */}
          <button onClick={handleTitleChange}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${settings.isActive ? `text-${theme}-500` : `text-${theme}-300`}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

          </button>
        </div>
        <div className="flex items-start justify-between gap-4">
        {settings.isActive && 
          <div className="">
            <VarXY theme={theme} value={[position.x, position.y]} onChange={handleLocationChange}/>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Title;