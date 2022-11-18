import React, {useEffect, useRef, useState} from 'react';
import EditableTitle from './EditableTitle';

type BannerPreviewProps = {
  settings: {},
  titleSettings: {
    text: string;
    isActive: boolean;
  }
}

const BannerPreview = ({settings, titleSettings}: BannerPreviewProps) => {
  const canvasRef = useRef(null);
  const waveRef = useRef({
    x: 0,
    y: 0,
    amplitude: 144,
    frequency: 0.012,
    trails: 0.016,
    lineWidth: 7.2,
    echo: 10,
    echoOffset: 120,
    backgroundColor: "#dce775",
    foregroundColor: "#000000",
  });
  const inputRef = React.createRef<HTMLInputElement>();
  const textareaRef = useRef();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    updateWidth();
    requestAnimationFrame(tick);
  },[]);

  const updateWidth = () => {
    return window.innerWidth;
  }

  const renderFrame = () => {};

  const tick = () => {
    console.log("tick");
    if (!canvasRef.current) return;
    renderFrame();
    setTimeout(() => {
      requestAnimationFrame(tick);
    }, 1000);
  };

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
        <canvas id="previewCanvas" ref={canvasRef} width={updateWidth()} height="256"  className="-z-10 absolute inset-0"></canvas>
    </div>
  );
};

export default BannerPreview;