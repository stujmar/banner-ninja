import React, {useEffect, useState} from 'react';

type BokehLayersProps = {
  settings: any;
  theme: string;
  onChange: (value: any) => void;
};

const BokehLayers = ({settings, onChange, theme}: BokehLayersProps) => {
  const [layers, setLayers] = useState<any>([]);
  const handleChange = (e: any) => {
    onChange({target: {name: settings.attribute, value: e.target.value}});
  }

  useEffect(() => {
    setLayers(settings.value.map((property: any, index: number) => {
      console.log(property);
      return <div className="border rounded-lg bg-white text-black" key={index}>{property.count}</div>
      }))
  }, []);

  return (
    <div className={`w-full bg-white sm:module-${theme}-border font-medium py-px px-2 rounded`}>
      <span className={`font-nunito font-bold text-left text-${theme}-800`}>{settings.label}</span>
      <div className="mt-2">
        {layers}
      <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-2 w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg></button>
      </div>
    </div>
  );
};

export default BokehLayers;