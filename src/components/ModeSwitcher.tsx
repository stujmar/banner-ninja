import React from 'react';

type ModePickerProps = {
    onClick: (mode: string) => void;
    mode: string;
}

const ModeSwitcher = ({onClick, mode}: ModePickerProps) => {
    const handleChange = (event: any) => {
        onClick(event.target.value);
    }
    return (
        <div className="sm:module-border">
            <p className="text-lg font-nunito font-bold text-gray-800">Animation Mode</p>
            <div className="flex gap-2 mt-2">
                <div className="flex items-center">
                    <input checked={ mode == "waves" } id="default-radio-1" onChange={(e) => handleChange(e)} type="radio" value="waves" name="mode-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-radio-1" className="font-nunito font-medium ml-2 text-sm text-gray-900">Waves</label>
                </div>
                <div className="flex items-center">
                    <input checked={ mode == "bokeh" } id="default-radio-2" type="radio" onChange={(e) => handleChange(e)} value="bokeh" name="mode-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-radio-2" className="font-nunito font-medium ml-2 text-sm text-gray-900">Bokeh</label>
                </div>
                <div className="flex items-center">
                    <input disabled checked={ mode == "plasma" } id="default-radio-3" type="radio" onChange={(e) => handleChange(e)} value="plasma" name="mode-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-radio-3" className="font-nunito font-medium ml-2 text-sm text-gray-300">Plasma</label>
                </div>
            </div>
        </div>
    );
};

export default ModeSwitcher;