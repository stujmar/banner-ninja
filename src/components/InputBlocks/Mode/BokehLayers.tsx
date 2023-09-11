import {Key, useCallback, useEffect, useState} from 'react';
import BokehLayer from './BokehLayer';
import update from 'immutability-helper'

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

  const changeLayer = (id: number, values: any) => {
    let newLayers = settings.layers;
    newLayers[id] = values;
    onChange({target: {type: "property", name: "bokehLayers", value: newLayers}});
  };

  const addLayer = () => {
    let newLayers = settings.layers;
    newLayers.push({
      "count": {
        "min": 1,
        "max": 50,
        "value": 20
      },
      "color": "rgba(82,122,154,0.85)",
      "blur": 10,
      "movementRate": 1,
      "movementAmount": 1
    });
    onChange({target: {type: "property", name: "bokehLayers", value: newLayers}});
  };

  const removeLayer = (id: number) => {
    let newLayers = settings.layers;
    delete newLayers[id];
    onChange({target: {type: "property", name: "bokehLayers", value: newLayers}});
  };

  useEffect(() => {
    setLayers(settings.layers.map((property: any, index: number) => {
      // return <BokehLayer key={index} id={index} settings={property} onChange={changeLayer} onClick={(id) => removeLayer(id)} theme={theme} />
      return renderLayer(property, index);
      }))
  }, [settings]);

  const renderLayer = useCallback((BokehLayer: JSX.IntrinsicAttributes, index: Key | null | undefined) => {
    return (
      <BokehLayer
        key={index}
        id={index}
        settings={BokehLayer}
        onChange={changeLayer}
        onClick={(id: number) => removeLayer(id)}
        theme={theme} />
      )
  }, [])

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