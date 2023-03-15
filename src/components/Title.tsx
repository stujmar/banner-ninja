import React from 'react';

type TitleProps = {
  value: string;
  explainer: string;
  theme: string;
  onClick: () => void;
}

const Title = ({value, explainer, theme, onClick}: TitleProps) => {
  return (
    <button onClick={onClick} className={`font-nunito font-bold w-40 text-left text-${theme}-800 sm:module-${theme}-border hover:shadow-sm hover:bg-slate-50`}>
      <span className={`ml-1 text-xs text-${theme}-500`}>for display only</span>
    </button>
  );
};

export default Title;