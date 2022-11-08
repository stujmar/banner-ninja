import React, {useRef, useState} from 'react';
import EditableTitle from './EditableTitle';

type BannerPreviewProps = {
}

const BannerPreview = ({}: BannerPreviewProps) => {
  const inputRef = useRef();
  const textareaRef = useRef();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="w-full h-64 bg-transparent relative">
        <div className="flex justify-center items-center w-full h-full">
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
              className="text-4xl font-bold text-red-800 bg-transparent focus:outline-none"
              placeholder="Banner Ninja"
              value={task}
              onChange={e => setTask(e.target.value)}
            />
          </EditableTitle>
        </div>
        <canvas id="previewCanvas" className="-z-10 h-full w-full absolute inset-0"></canvas>
    </div>
  );
};

export default BannerPreview;