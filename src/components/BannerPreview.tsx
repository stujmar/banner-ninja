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
    <div className="w-full h-64 bg-gray-100">
        <div className="flex justify-center items-center w-full h-full bg-gray-200">
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
              className="text-4xl font-bold text-red-800 bg-transparent border-4 focus:outline-none"
              placeholder="Banner Ninja"
              value={task}
              onChange={e => setTask(e.target.value)}
            />
          </EditableTitle>
        </div>
    </div>
  );
};

export default BannerPreview;