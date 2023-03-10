import React from 'react';
import FaderSimple from './FaderSimple';

type BokehLayerProps = {
    settings: any;
    id: number;
    theme: string;
    onClick: (id: number) => void;
}

const BokehLayer = ({settings, id, theme, onClick}: BokehLayerProps) => {
 
    const handleChange = (e: any) => {};

    return (
        <div className={`flex flex-col items-end gap-2 mt-2 sm:module-${theme}-border transition-all`}>
            <FaderSimple label={"color"} theme={theme} onChange={handleChange} />
            <button onClick={() => onClick(id)} className={`w-min rounded-full hover:shadow-sm hover:bg-stone-400`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    );
};

export default BokehLayer;