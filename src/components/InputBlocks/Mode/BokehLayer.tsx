import React, {useRef, useEffect, useState} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BokehColor from './BokehColor';
import { VarXY } from '../../dragXY/VarXY';
import FaderSimple from '../Shared/FaderSimple';
import DragIcon from '../../icons/DragIcon';

type BokehLayerProps = {
    settings: any;
    id: number;
    theme: string;
    onClick: ((e: any) => void);
    onChange: ((id: any, values: any) => void);
}

const BokehLayer = ({settings, id, theme, onClick, onChange}: BokehLayerProps) => {
    const [dragValue, setDragValue] = useState<[number,number]>([0,0]);
    const [localSettings, setLocalSettings] = useState<any>(settings);
    const ref = useRef(null);

    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleColorChange = (e: any) => {
        let r = e.target.value.rgb.r,
            g = e.target.value.rgb.g,
            b = e.target.value.rgb.b,
            a = e.target.value.rgb.a;
        let newSettings = {...settings, [e.target.name]: `rgba(${r},${g},${b},${a})`};
        onChange(id, newSettings);
    };

    const handleChange = (e: any) => {
        let newSettings = {...settings, [e.target.name]: e.target.value};
        onChange(id, newSettings);
    }

    const handleXY = (e: any) => {
        setDragValue(e);
    }
    return (
        <div className={`cursor-grab flex items-start gap-4 mt-2 sm:module-${theme}-border transition-all`}>
            <DragIcon classes={"my-auto content-fill fill-stone-300"} />
            <BokehColor settings={settings} id={id} onClick={handleColorChange} theme={theme}/>
            <FaderSimple label={"Count"} setting={settings.count} theme={theme} onChange={handleChange} />
            <div className="flex justify-between gap-2">
                <div className="font-nunito font-bold text-left text-stone-800">Repel</div>
                <input className="accent-stone-500 text-stone-600 checked:bg-stone-500" type="checkbox" />
            </div>
            <VarXY value={dragValue} theme={theme} onChange={handleXY} />
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