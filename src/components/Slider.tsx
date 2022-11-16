import React from 'react';

type SliderProps = {
  property: string;
  minimum: number;
  maximum: number;
  value: number;
  step: number;
};

const Slider = ({property, minimum, maximum, value, step}: SliderProps) => {

  const handleChange = (event: any) => {
    console.log(event.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-gray-800">{property}</h1>
      <div className="w-100 -mt-2 bg-lime-500 flex justify-center items-start">
      <input 
        type="range"
        name="timeSlider"
        id="timeSlider"
        className="mt-12"
        value={value}
        min={minimum}
        max={maximum}
        step={step}
        onChange={handleChange}
      />
      </div>
    </div>
  );
};

export default Slider;