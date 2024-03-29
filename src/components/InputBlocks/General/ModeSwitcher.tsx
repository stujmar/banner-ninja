import React from 'react';

type ModePickerProps = {
    onClick: (mode: string) => void;
    mode: string;
    theme: string;
}

const ModeSwitcher = ({onClick, mode, theme}: ModePickerProps) => {
    const handleChange = (event: any) => {
        onClick(event.target.value);
    }
    return (
        <div className={`sm:module-${theme}-border`}>
            <p className={`text-lg font-nunito font-bold text-${theme}-800`}>Animation Mode</p>
            <div className="flex gap-2 mt-2">
                <div className="flex items-center">
                    <input checked={ mode == "waves" } id="default-radio-1" onChange={(e) => handleChange(e)} type="radio" value="waves" name="mode-radio" className={`w-4 h-4 accent-${theme}-600 bg-gray-100 border-gray-300 focus:ring-none`}/>
                    <label htmlFor="default-radio-1" className={`font-nunito font-medium ml-2 text-sm text-${theme}-900`}>Waves</label>
                </div>
                <div className="flex items-center">
                    <input checked={ mode == "bokeh" } id="default-radio-2" type="radio" onChange={(e) => handleChange(e)} value="bokeh" name="mode-radio" className={`w-4 h-4 accent-${theme}-600 border border-red-400 fill-blue-500 stroke-lime-500 bg-gray-100 border-gray-300 focus:ring-none`}/>
                    <label htmlFor="default-radio-2" className={`font-nunito font-medium ml-2 text-sm text-${theme}-900`}>Bokeh</label>
                </div>
                <div className="flex items-center">
                    <input checked={ mode == "plasma" } id="default-radio-3" type="radio" onChange={(e) => handleChange(e)} value="plasma" name="mode-radio" className={`w-4 h-4 accent-${theme}-600 bg-gray-100 border-gray-300 focus:ring-none`}/>
                    <label htmlFor="default-radio-3" className={`font-nunito font-medium ml-2 text-sm text-${theme}-900`}>Plasma</label>
                </div>
            </div>
        </div>
    );
};

export default ModeSwitcher;