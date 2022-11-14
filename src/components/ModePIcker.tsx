import React from 'react';

type ModePickerProps = {
    onClick: (mode: string) => void;
    mode: string;
}

const ModePicker = ({onClick, mode}: ModePickerProps) => {
    const handleChange = (event: any) => {
        onClick(event.target.value);
    }
    return (
        <div className="h-24 bg-gray-50 rounded-lg p-3">
            <p className="text-lg font-medium text-gray-800">{mode.charAt(0).toUpperCase() + mode.slice(1)} Mode</p>
            <div className="flex gap-2 mt-4">
                <div className="flex items-center">
                    <input checked={ mode == "default" } id="default-radio-1" onChange={(e) => handleChange(e)} type="radio" value="default" name="mode-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default</label>
                </div>
                <div className="flex items-center">
                    <input checked={ mode == "waves" } id="default-radio-2" type="radio" onChange={(e) => handleChange(e)} value="waves" name="mode-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Waves</label>
                </div>
                <div className="flex items-center">
                    <input disabled={true} checked={ mode == "plasma" } id="default-radio-3" type="radio" onChange={(e) => handleChange(e)} value="plasma" name="mode-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-radio-3" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-300">Plasma</label>
                </div>
            </div>
        </div>
    );
};

export default ModePicker;