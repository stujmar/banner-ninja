import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

type BokehColorProps = {
    settings: any;
    id: number;
    theme: string;
    onClick: (e: any) => void;
}

const BokehColor = ({settings, id, theme, onClick}: BokehColorProps) => {
    const [popup, setPopup] = useState(false);
    const handleChange = (e: any) => {
        onClick({target: {type: "color", name: "color", value: e.target.value}});
    };
    console.log(settings);
    return (
        <div className={`w-32`}>
        {popup ? <button onClick={() => {setPopup(false)}} className="fixed top-0 left-0 z-30 h-screen w-screen" ></button> : null}
        <div className={`text-${theme}-800 font-nunito font-bold`}>{`Color`}</div>
        <button className="w-full" onClick={() => {setPopup(!popup)}}><div style={{background: settings.color}} className={`mt-1 w-full -mb-2 h-6 rounded-lg border border-${theme}-400`}></div></button>
        {popup ? <div className="absolute z-40"><ChromePicker
          color={settings.color}
          onChange={(e) => handleChange(e)}
          /></div> : null}
      </div>
    );
};

export default BokehColor;