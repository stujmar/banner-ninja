import React, { useEffect, useRef, useState } from 'react';
import EditableTitle from './EditableTitle';
import renderWave from './animations/renderWave';
import getInitialState from './animations/getInitialState';
import renderPlasma from './animations/renderPlasma';
import renderBokeh from './animations/renderBokeh';

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
  blur: number,
  // titleSettings: {
  //   text: string;
  //   isActive: boolean;
  // }
  titleSettings: any,
  updateSettings: (settings: any) => void;
}


const BannerPreview = ({ mode, blur, settings, titleSettings}: BannerPreviewProps) => {
  const size = { width: screen.width, height: 256 };
  const requestIdRef: any = useRef(null);
  const canvasRef: any = useRef(null);
  const contextRef: any = useRef(null);
  const waveRef: any = useRef(getInitialState(mode));
  const inputRef = React.createRef<HTMLInputElement>();
  const [task, setTask] = useState("");
  let increment = 0;
  const [height, setHeight] = useState(256);

  function handleResize() {
    if (size.width !== window.innerWidth) {
    establishContext();
    }
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

  const updateAnimation = (_mode : string) => {
    if (waveRef.current?.mode === "waves" && typeof waveRef.current.x === "number") {
      waveRef?.current?.x > window.innerWidth ? (waveRef.current.x = 0) : (waveRef.current.x += .1);
    }
  };

  const establishContext = () => {
    canvasRef.current = document.getElementById('previewCanvas');
    const canvas = canvasRef.current;
    canvas.width = screen.width;
    canvas.height = waveRef.current.height;
    const context = canvas.getContext('2d');
    contextRef.current = context;
  };

  useEffect(() => {
    establishContext();
  },[height])

  const renderFrame = () => {
    updateAnimation(mode);
    if (waveRef.current?.mode  === "waves") {
      waveRef.current = renderWave.call(contextRef.current, {width: canvasRef.current.width, height: size.height}, waveRef.current, increment);
      increment = waveRef.current.increment
    } else if (waveRef.current?.mode === "bokeh") {
      waveRef.current = renderBokeh.call(contextRef.current, {width: canvasRef.current.width, height: size.height}, waveRef.current);
    } else if (waveRef.current?.mode === "plasma") {
      renderPlasma.call(contextRef.current, {width: canvasRef.current.width, height: size.height}, waveRef.current);
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
        <div className="absolute" style={{top: `${42 + (titleSettings.position.y * 50)}%`, left: `${45 + (titleSettings.position.x * 50)}%`}}>
          { titleSettings.isActive && 
          <EditableTitle
          text={task}
          placeholder="banner.ninja"
          childRef={inputRef}
          type="input"
          >
              <input
                ref={inputRef}
                type="text"
                name="task"
                className="text-4xl font-nunito font-bold text-gray-900 bg-transparent focus:outline-none"
                placeholder="banner.ninja"
                value={task}
                onChange={e => setTask(e.target.value)}
                />
            </EditableTitle>
            }
        </div>
        <div style={{backdropFilter: `blur(${blur}px)`}} className="absolute -z-10 inset-0 h-screen bg-white/0"></div>
        <div style={{background: `${settings.properties[1].value}`}} className="absolute -z-20 inset-0 h-screen bg-white/0"></div>
        <canvas id="previewCanvas" ref={canvasRef} className="absolute -z-20 inset-0"></canvas>
    </div>
  );
};

export default BannerPreview;