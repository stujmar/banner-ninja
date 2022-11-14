import { useEffect, useState, useMemo } from 'react';
import BannerPreview from './components/BannerPreview';
import ColorPicker from './components/ColorPicker';
import CodePreview from './components/CodePreview';
import ModePicker from './components/ModePIcker';

function App() {
  const [color, setColor] = useState("#dce775");
  const [settings, setSettings] = useState({
    backgroundColor: "#dce775",
    foregroundColor: "#000000",
    x: 0,
    y: 0,
  });
  const [animationMode, setAnimationMode] = useState("default");
  const [titleSettings, setTitleSettings] = useState({
    text: "Banner Ninja",
    isActive: true,
  });

  const idHash = useMemo(() => {
    return Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)
  }, []);

  const toggleTitle = () => {
    setTitleSettings({
      ...titleSettings,
      isActive: !titleSettings.isActive
    });
  }

  useEffect(() => {
    runAnimation(animationMode, settings);
  }, [settings, animationMode]);

  const handleColorChange = (color: string) => {
    setSettings({
      ...settings,
      backgroundColor: color,
    });
  }

  function runAnimation(mode: string, settings: any) {
    // setup canvas
    const canvas = document.getElementById("previewCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (mode == "default") {
      ctx!.fillStyle = settings.backgroundColor;
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
    } else if (mode == "waves") {
      ctx!.fillStyle = settings.backgroundColor;
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
    }
  
    requestAnimationFrame(() => {
      if (mode == "waves") {
        // redraw background
        ctx!.fillStyle = settings.backgroundColor;
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
        // draw circle
        // console.log("animating", settings.x);
        ctx!.fillStyle = settings.foregroundColor;
        ctx!.beginPath();
        ctx!.arc(settings.x, 50, 25, 0, 2 * Math.PI);
        ctx!.fill();
        setSettings({
          ...settings,
          x: settings.x > canvas.width ? 0 : settings.x + 1,
        });
        console.log(canvas.width)
        // runAnimation(mode, settings);
      }
    }
    );
  }

  return (
    <div>
        <BannerPreview titleSettings={titleSettings} />
        <div className="container max-w-6xl flex flex-col p-4 bg-gray-600 mx-auto h-screen justify-start items-center md:items-start">
          <div className="mt-4">
            {/* Top Row */}
            <div className="flex items-start gap-4">
            <ColorPicker onChange={handleColorChange} />
            <ModePicker mode={animationMode} onClick={(e) => {setAnimationMode(e)}} />
            <button type="button" onClick={toggleTitle} className="font-medium text-base bg-gray-50 text-gray-800 px-4 py-2 rounded-md shadow-md">Toggle Title <span className="text-xs text-gray-500">(for display only.)</span></button>
            </div>
          </div>
          <div className="p-2"></div>
          {/* Code Preview */}
          <CodePreview idHash={idHash} color={settings.backgroundColor} />
        </div>
    </div>
  )
}

export default App;
