import React, { useEffect, useRef, useState } from 'react';
import EditableTitle from './EditableTitle';
import renderWave from './animations/renderWave';
import getInitialState from './animations/getInitialState';
import renderDefault from './animations/renderDefault';

interface Setting {
  mode: string,
  x: number,
  y: number,
  increment: number,
  blur: number
  properties: any[]
}

type BannerPreviewProps = {
  mode: string,
  settings: Setting,
  titleSettings: {
    text: string;
    isActive: boolean;
  }
  updateSettings: (settings: any) => void;
}


const BannerPreview = ({ mode, settings, titleSettings}: BannerPreviewProps) => {
  const size = { width: screen.width, height: 256 };
  const requestIdRef: any = useRef(null);
  const canvasRef: any = useRef(null);
  const contextRef: any = useRef(null);
  const waveRef: any = useRef(getInitialState(mode));
  const inputRef = React.createRef<HTMLInputElement>();
  const [task, setTask] = useState("");
  const [height, setHeight] = useState(256);

  function handleResize() {
    establishContext();
  }
  window.addEventListener('resize', handleResize);

  // This might be what is slowing everything down?
  useEffect(() => {
    let updatedSettings = { ...settings }; // possibly sloppy.
    updatedSettings.x = waveRef?.current?.x;
    waveRef.current = updatedSettings;
    setHeight(waveRef.current.height);
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
      waveRef?.current?.x > window.innerWidth ? (waveRef.current.x = 0) : (waveRef.current.x += .1);
    }
  };

  const establishContext = () => {
    canvasRef.current = document.getElementById('previewCanvas');
    const canvas = canvasRef.current;
    canvas.width = screen.width;
    console.log(waveRef.current.height, canvas.height, height)
    canvas.height = waveRef.current.height;
    const context = canvas.getContext('2d');
    contextRef.current = context;
  };

  useEffect(() => {
    establishContext();
  },[height])

  const renderFrame = () => {
    if (waveRef.current !== settings) {
      establishContext();
    }
    updateWave(mode);
    if (waveRef.current?.mode  === "waves") {
      waveRef.current = renderWave.call(contextRef.current, {width: canvasRef.current.width, height: size.height}, waveRef.current);
    } else if (waveRef.current?.mode === "default") {
      renderDefault.call(contextRef.current, {width: canvasRef.current.width, height: size.height}, waveRef.current);
    }
  };

  const tick = () => {
    if (!canvasRef.current) return;
    renderFrame();
    if (waveRef.current !== settings) {
    }
    requestAnimationFrame(tick);
  };

  return (
    <div id="bannerParent" style={{height: height + "px"}} className="bg-transparent relative overflow-hidden">
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
                className="text-4xl font-nunito font-bold text-gray-900 bg-transparent focus:outline-none"
                placeholder="Banner Ninja"
                value={task}
                onChange={e => setTask(e.target.value)}
                />
            </EditableTitle>
            }
        </div>
        <div style={{backdropFilter: `blur(${waveRef.current?.blur}px)`}} className="absolute -z-10 inset-0 bg-white/0"></div>
        <canvas id="previewCanvas" ref={canvasRef} className="absolute -z-20 inset-0"></canvas>
    </div>
  );
};

export default BannerPreview;