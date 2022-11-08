import { useEffect, useState } from 'react';
import './App.css';
import BannerPreview from './components/BannerPreview';
import ColorPicker from './components/ColorPicker';
import CodePreview from './components/CodePreview';

function App() {
  const [color, setColor] = useState("#dce775");

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
        <BannerPreview />
      <header className="App-header">
        <div className="flex items-start gap-12">
          <div className="mt-8">
            <ColorPicker onChange={handleColorChange} />
          </div>
          <CodePreview color={color} />
        </div>
      </header>
    </div>
  )
}

export default App
