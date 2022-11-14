import React, {useEffect, useRef, useState} from 'react';
import EditableTitle from './EditableTitle';

type BannerPreviewProps = {
  titleSettings: {
    text: string;
    isActive: boolean;
  }
}

const BannerPreview = ({titleSettings}: BannerPreviewProps) => {
  // const inputRef = useRef();
  const inputRef = React.createRef<HTMLInputElement>();
  const textareaRef = useRef();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    updateWidth();
  },[]);

  const updateWidth = () => {
    return window.innerWidth;
  }

  return (
    <div id="bannerParent" className="w-full h-64 bg-transparent relative">
        <div className="flex justify-center items-center w-full h-full">
          { titleSettings.isActive && 
          <EditableTitle
          text={task}
          placeholder="Banner Ninja"
          childRef={inputRef}
          type="input"
          >
              <input
                ref={inputRef}
                type="text"
                name="task"
                className="text-4xl font-bold text-gray-800 bg-transparent focus:outline-none"
                placeholder="Banner Ninja"
                value={task}
                onChange={e => setTask(e.target.value)}
                />
            </EditableTitle>
            }
        </div>
        <canvas id="previewCanvas" width={updateWidth()} height="256"  className="-z-10 absolute inset-0"></canvas>
    </div>
  );
};

export default BannerPreview;