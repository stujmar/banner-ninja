import { useEffect, useState, useMemo } from 'react';
import BannerPreview from './components/BannerPreview';
import ColorPicker from './components/ColorPicker';
import CodePreview from './components/CodePreview';
// import ModePicker from './components/ModePIcker';

function App() {
  const [color, setColor] = useState("#dce775");
  const [animationsMode, setAnimationMode] = useState("waves");
  const [titleSettings, setTitleSettings] = useState({
    text: "Banner Title",
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
    const canvas = document.getElementById("previewCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ctx!.fillStyle = color;
    ctx!.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleColorChange = (color: string) => {
    const canvas = document.getElementById("previewCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ctx!.fillStyle = color;
    ctx!.fillRect(0, 0, canvas.width, canvas.height);
    setColor(color);
  }

  return (
    <div>
        <BannerPreview titleSettings={titleSettings} />
        <div className="container max-w-6xl flex flex-col p-4 bg-gray-600 mx-auto h-screen justify-start items-center md:items-start">
          <div className="mt-4">
            {/* Top Row */}
            <div className="flex items-start gap-4">
            <ColorPicker onChange={handleColorChange} />
            {/* <ModePicker /> */}
            <button type="button" onClick={toggleTitle} className="font-medium text-base bg-gray-50 text-gray-800 px-4 py-2 rounded-md">Toggle Title <span className="text-xs text-gray-500">(title for display only.)</span></button>
            </div>
          </div>
          <div className="p-2"></div>
          <CodePreview idHash={idHash} color={color} />
        </div>
    </div>
  )
}

export default App;
