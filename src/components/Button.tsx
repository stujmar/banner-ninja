import React from 'react';

type ButtonProps = {
  text: string;
};

const Button = ({text}: ButtonProps) => {
  return (
    <button className="bg-purple-500 hover:bg-purple-700 text-white font-medium py-px px-2 rounded">
      {text}
    </button>
  );
};

export default Button;