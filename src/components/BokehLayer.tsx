import React from 'react';

type BokehLayerProps = {
  settings: any;
  theme: string;
};

const BokehLayer = ({settings, theme}: BokehLayerProps) => {
  return (
    <div className="bg-purple-500 hover:bg-purple-700 text-white font-medium py-px px-2 rounded">

    </div>
  );
};

export default BokehLayer;