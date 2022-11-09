import { useEffect, useState, useMemo } from 'react';
import BannerPreview from './components/BannerPreview';
import ColorPicker from './components/ColorPicker';
import CodePreview from './components/CodePreview';

function App() {
  const [color, setColor] = useState("#dce775");
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
    console.log("app level", color);
    setColor(color);
  }

  return (
    <div>
        <BannerPreview titleSettings={titleSettings} />
        <div className="flex flex-col p-4 bg-gray-600 container mx-auto h-screen justify-start items-center md:items-start">
          <div className="mt-4">
            <ColorPicker onChange={handleColorChange} />
            <button type="button" onClick={toggleTitle} className="mt-4 font-medium text-sm bg-gray-50 text-gray-800 px-4 py-2 rounded-md uppercase">Toggle Title</button>
          </div>
          <div className="p-2"></div>
          <CodePreview idHash={idHash} color={color} />
        </div>
    </div>
  )
}

export default App;
