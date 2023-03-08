import React from 'react';

type BokehLayerProps = {
    label: string;
    explainer: string;
    theme: string;
    onClick: () => void;
}

const BokehLayer = ({label, explainer, theme, onClick}: BokehLayerProps) => {
    
    return (
        <>
            <button onClick={onClick} className={`font-nunito font-bold w-40 text-left text-${theme}-800 sm:module-${theme}-border hover:shadow-sm hover:bg-slate-50`}>
                {label}{explainer && <span className={`ml-1 text-xs text-${theme}-500`}>{explainer}</span>} 
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </>
    );
};

export default BokehLayer;