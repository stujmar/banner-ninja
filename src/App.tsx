import { useEffect, useRef, useState, useMemo } from 'react';
import BannerPreview from './components/BannerPreview';
import ColorPicker from './components/ColorPicker';
import CodePreview from './components/CodePreview';
import ModePicker from './components/ModePIcker';

function App() {
  let canvas: any, ctx: any;
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#dce775");
  const [initalized, setInitalized] = useState(false);
  const [settings, setSettings] = useState({
    background: "#dce775",
    foreground: "#000000",
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

  // useEffect(() => {
  //   runAnimation(animationMode, settings);
  // }, [settings, animationMode]);

  const handleColorChange = (newColor: {label: string, value: string}) => {
    let labelString: string = newColor.label.toLowerCase();
    setSettings({
      ...settings,
      [labelString]: newColor.value,
    });
  }

  return (
    <div>
        <BannerPreview mode={animationMode} settings={settings} titleSettings={titleSettings} />
        <div className="container overflow-hidden max-w-6xl flex flex-col p-4 bg-gray-600 mx-auto h-screen justify-start items-center md:items-start">
          <div className="mt-4">
            {/* Top Row */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-4">
                <ColorPicker label={"Foreground"} onChange={(e) => handleColorChange(e)} />
                <ColorPicker label={"Background"} onChange={handleColorChange} />
              </div>
            <ModePicker mode={animationMode} onClick={(e) => {setAnimationMode(e)}} />
            <button type="button" onClick={toggleTitle} className="font-medium text-base bg-gray-50 text-gray-800 px-4 py-2 rounded-md shadow-md">Toggle Title <span className="text-xs text-gray-500">(for display only.)</span></button>
            </div>
          </div>
          <div className="p-2"></div>
          {/* Code Preview */}
          <CodePreview idHash={idHash} color={settings.background} />
        </div>
    </div>
  )
}

export default App;
