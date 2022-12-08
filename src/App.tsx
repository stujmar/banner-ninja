import { useEffect, useRef, useState, useMemo } from 'react';
import BannerPreview from './components/BannerPreview';
import ColorPicker from './components/ColorPicker';
import CodePreview from './components/CodePreview';
import ModePicker from './components/ModePIcker';
import getInitialState from './components/animations/getInitialState';
import ToggleButton from './components/ToggleButton';
import Fader from './components/Fader';

function App() {
  let canvas: any, ctx: any;
  const settingsRef = useRef(null);
  const [color, setColor] = useState("#dce775");
  const [initalized, setInitalized] = useState(false);
  const [mode, setMode] = useState("default");
  const [settings, setSettings] = useState<any>(getInitialState(mode));
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

  const handleModeChange = (mode: string) => {
    setMode(mode);
    setSettings(getInitialState(mode));
  }

  const handleColorChange = (newColor: {label: string, value: string}) => {
    let labelString: string = newColor.label.toLowerCase();
    setSettings({
      ...settings,
      [labelString]: newColor.value,
    });
  }

  const handleSettingsChange = (e: any) => {
    console.log(e.target.value);
  }

  return (
    <div>
        <BannerPreview mode={mode} settings={settings} titleSettings={titleSettings} />
        <div className="container overflow-hidden max-w-6xl flex flex-col p-4 bg-slate-50 mx-auto h-screen justify-start items-center md:items-start">
          <div>
            {/* Top Row */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-4">
                {!!getInitialState(mode)?.foreground && <ColorPicker label={"foreground"} onChange={(e) => handleColorChange(e)} />}
                <ColorPicker label={"background"} onChange={handleColorChange} />
              </div>
            <ModePicker mode={mode} onClick={(e) => {handleModeChange(e)}} />
            <ToggleButton label={"Toggle Title"} explainer={"(for display only.)"} onClick={toggleTitle} />
            <Fader label="Test Fader" min={0} max={0} value={0} step={0} onChange={handleSettingsChange}/>
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
