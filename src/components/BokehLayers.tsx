import React, {useEffect, useState} from 'react';
import BokehLayer from './BokehLayer';

type BokehLayersProps = {
  settings: any;
  theme: string;
  onChange: (value: any) => void;
};

const BokehLayers = ({settings, onChange, theme}: BokehLayersProps) => {
  const [layers, setLayers] = useState<any>([]);
  
  const handleChange = (e: any) => {
    onChange({target: {type: "bokehLayers", name: settings.attribute, value: e.target.value}});
  }

  const addLayer = () => {
    let newLayers = settings.layers;
    console.log("adding new layer")
    newLayers.push({id: layers.length, count: 0, color: "#000000"});
    onChange({target: {type: "property", name: "bokehLayers", value: newLayers}});
  };

  const removeLayer = (id: number) => {
    console.log(id);
    //remove layer of index id from layers
    let newLayers = settings.layers;
    delete newLayers[id];
    onChange({target: {type: "property", name: "bokehLayers", value: newLayers}});
  };

  useEffect(() => {
    setLayers(settings.layers.map((property: any, index: number) => {
      return <BokehLayer key={index} id={index} settings={property} onClick={(id) => removeLayer(id)} theme={theme} />
      }))
  }, [settings]);

  return (
    <div className={`w-full bg-white sm:module-${theme}-border font-medium py-px px-2 rounded`}>
      <span className={`font-nunito font-bold text-left text-${theme}-800`}>{settings.label}</span>
      <div className="mt-2">
        {layers}
      <button onClick={addLayer}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-2 w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg></button>
      </div>
    </div>
  );
};

export default BokehLayers;