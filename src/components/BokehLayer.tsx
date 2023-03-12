import React from 'react';
import BokehColor from './BokehColor';
import FaderSimple from './FaderSimple';

type BokehLayerProps = {
    settings: any;
    id: number;
    theme: string;
    onClick: ((e: any) => void);
    onChange: ((id: any, values: any) => void);
}

const BokehLayer = ({settings, id, theme, onClick, onChange}: BokehLayerProps) => {
 
    const handleChange = (e: any) => {
        let r = e.target.value.rgb.r,
            g = e.target.value.rgb.g,
            b = e.target.value.rgb.b,
            a = e.target.value.rgb.a;
        let newSettings = {...settings, [e.target.name]: `rgba(${r},${g},${b},${a})`};
        onChange(id, newSettings);
    };

    return (
        <div className={`cursor-grab flex items-start gap-4 mt-2 sm:module-${theme}-border transition-all`}>
            <svg width="11" className="content-fill fill-stone-300 text-stone-300" height="53" viewBox="0 0 11 53" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.17 4.34C3.36846 4.34 4.34 3.36846 4.34 2.17C4.34 0.971542 3.36846 0 2.17 0C0.971542 0 0 0.971542 0 2.17C0 3.36846 0.971542 4.34 2.17 4.34Z" />
                <path d="M8.39 10.56C9.58846 10.56 10.56 9.58846 10.56 8.39C10.56 7.19154 9.58846 6.22 8.39 6.22C7.19154 6.22 6.22 7.19154 6.22 8.39C6.22 9.58846 7.19154 10.56 8.39 10.56Z" />
                <path d="M2.17 16.39C3.36846 16.39 4.34 15.4185 4.34 14.22C4.34 13.0215 3.36846 12.05 2.17 12.05C0.971542 12.05 0 13.0215 0 14.22C0 15.4185 0.971542 16.39 2.17 16.39Z" />
                <path d="M8.39 22.61C9.58846 22.61 10.56 21.6385 10.56 20.44C10.56 19.2415 9.58846 18.27 8.39 18.27C7.19154 18.27 6.22 19.2415 6.22 20.44C6.22 21.6385 7.19154 22.61 8.39 22.61Z" />
                <path d="M2.17 28.45C3.36846 28.45 4.34 27.4785 4.34 26.28C4.34 25.0815 3.36846 24.11 2.17 24.11C0.971542 24.11 0 25.0815 0 26.28C0 27.4785 0.971542 28.45 2.17 28.45Z" />
                <path d="M8.39 34.67C9.58846 34.67 10.56 33.6985 10.56 32.5C10.56 31.3015 9.58846 30.33 8.39 30.33C7.19154 30.33 6.22 31.3015 6.22 32.5C6.22 33.6985 7.19154 34.67 8.39 34.67Z" />
                <path d="M2.17 40.5C3.36846 40.5 4.34 39.5285 4.34 38.33C4.34 37.1315 3.36846 36.16 2.17 36.16C0.971542 36.16 0 37.1315 0 38.33C0 39.5285 0.971542 40.5 2.17 40.5Z" />
                <path d="M8.39 46.73C9.58846 46.73 10.56 45.7585 10.56 44.56C10.56 43.3615 9.58846 42.39 8.39 42.39C7.19154 42.39 6.22 43.3615 6.22 44.56C6.22 45.7585 7.19154 46.73 8.39 46.73Z" />
                <path d="M2.17 52.56C3.36846 52.56 4.34 51.5885 4.34 50.39C4.34 49.1915 3.36846 48.22 2.17 48.22C0.971542 48.22 0 49.1915 0 50.39C0 51.5885 0.971542 52.56 2.17 52.56Z" />
            </svg>
            <BokehColor settings={settings} id={id} onClick={handleChange} theme={theme}/>
            <FaderSimple label={"Rate"} theme={theme} onChange={handleChange} />
            <button onClick={() => onClick(id)} className={`w-min rounded-full hover:shadow-sm hover:bg-stone-200`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    );
};

export default BokehLayer;