import React, {useRef, useState} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BokehColor from './BokehColor';
import { VarXY } from './dragXY/VarXY';
import FaderSimple from './FaderSimple';
import DragIcon from './icons/DragIcon';

type BokehLayerProps = {
    settings: any;
    id: number;
    theme: string;
    onClick: ((e: any) => void);
    onChange: ((id: any, values: any) => void);
}

const BokehLayer = ({settings, id, theme, onClick, onChange}: BokehLayerProps) => {
    const [dragValue, setDragValue] = useState<[number,number]>([0,0]);
    const ref = useRef(null);
    const handleChange = (e: any) => {
        let r = e.target.value.rgb.r,
            g = e.target.value.rgb.g,
            b = e.target.value.rgb.b,
            a = e.target.value.rgb.a;
        let newSettings = {...settings, [e.target.name]: `rgba(${r},${g},${b},${a})`};
        onChange(id, newSettings);
    };
    const handleXY = (e: any) => {
        console.log(e);
        setDragValue(e);
    }
    // console.log("boken layer", settings)
    return (
        <div className={`cursor-grab flex items-start gap-4 mt-2 sm:module-${theme}-border transition-all`}>
            <DragIcon classes={"my-auto content-fill fill-stone-300"} />
            <BokehColor settings={settings} id={id} onClick={handleChange} theme={theme}/>
            <FaderSimple label={"Count"} setting={settings.count} theme={theme} onChange={handleChange} />
            <VarXY value={dragValue} onChange={handleXY} />
            <FaderSimple label={"Repel Strength"} setting={settings.count} theme={theme} onChange={handleChange} />
            <button onClick={() => onClick(id)} className={`w-min rounded-full hover:shadow-sm hover:bg-stone-200`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    );
};

export default BokehLayer;