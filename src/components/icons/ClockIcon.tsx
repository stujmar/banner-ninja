import React from 'react';

type EyeBallProps = {
  theme: string;
  isActivated: boolean;
};

const EyeBall = ({theme, isActivated}: EyeBallProps) => {

  return (
    <svg 
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            className={`w-5 h-5 curson-pointer ${isActivated ? `text-${theme}-600` : `text-${theme}-400`}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

export default EyeBall;
