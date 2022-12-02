import React, { useEffect, useRef, useState } from 'react';
import EditableTitle from './EditableTitle';
import renderWave from './animations/renderWave';
import getInitialState from './animations/getInitialState';

type BannerPreviewProps = {
  mode: string,
  settings: any,
  titleSettings: {
    text: string;
    isActive: boolean;
  }
}

const BannerPreview = ({ mode, settings, titleSettings}: BannerPreviewProps) => {
  const size = { width: window.innerWidth, height: 250 };
  const requestIdRef: any = useRef(null);
  const canvasRef: any = useRef(null);
  const waveRef = useRef(getInitialState(mode));
  const inputRef = React.createRef<HTMLInputElement>();
  const [task, setTask] = useState("");

  function handleResize() {
    console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
    console.log(canvasRef.current)
    let canvasToUpdate : any = document.getElementById('previewCanvas');
    console.log(canvasToUpdate);
    if (canvasToUpdate !== undefined) {
      console.log('canvasToUpdate is defined');
      canvasToUpdate.style.width = updateWidth();
    }
  }
  window.addEventListener('resize', handleResize)

  useEffect(() => {
    let updatedSettings = { ...settings }; // possibly sloppy.
    updatedSettings.x = waveRef?.current?.x;
    waveRef.current = updatedSettings;
  }, [settings]);

  useEffect(() => {
    waveRef.current = getInitialState(mode);
  }, [mode]);

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestIdRef.current);
  },[]);

  const updateWave = (_mode : string) => {
    if (waveRef.current?.mode === "waves" && typeof waveRef.current.x === "number") {
      waveRef?.current?.x > window.innerWidth ? (waveRef.current.x = 0) : (waveRef.current.x += 1);
    }
  };

  const updateWidth = () => {
    return window.innerWidth;
  }

  const renderFrame = () => {
    const ctx = canvasRef.current!.getContext("2d");
    updateWave(mode);
    renderWave.call(ctx, size, waveRef.current);
  };

  const tick = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestAnimationFrame(tick);
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
        <canvas id="previewCanvas" ref={canvasRef} height="256" className="-z-10 absolute inset-0"></canvas>
    </div>
  );
};

export default BannerPreview;