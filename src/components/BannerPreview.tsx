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

  useEffect(() => {
    Object.keys(getInitialState(mode)).forEach((key: string) => {
      waveRef.current[key] = settings[key];
    });
  }, [settings]);

  useEffect(() => {waveRef.current = getInitialState(mode)}, [mode]);

  useEffect(() => {
    // updateWidth();
    // setup();
    requestIdRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestIdRef.current);
  },[]);

  const updateWave = () => {
    console.log(mode);
    if (mode === "waves") {
      console.log("updateWave");
      const wave = waveRef.current;
      waveRef.current.x > window.innerWidth ? (waveRef.current.x = 0) : (waveRef.current.x += 1);
    }
    console.log(waveRef.current.x);
  };

  const updateWidth = () => {
    return window.innerWidth;
  }

  const renderFrame = () => {
    // console.log("rendering frame");
    const ctx = canvasRef.current!.getContext("2d");
    updateWave();
    renderWave.call(ctx, size, waveRef.current);
    // ...
  };

  const tick = () => {
    // console.log("tick");
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
        <canvas id="previewCanvas" ref={canvasRef} width={updateWidth()} height="256"  className="-z-10 absolute inset-0"></canvas>
    </div>
  );
};

export default BannerPreview;