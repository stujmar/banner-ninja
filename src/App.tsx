import { useEffect, useRef, useState, useMemo } from 'react';
import BannerPreview from './components/BannerPreview';
import ColorPicker from './components/ColorPicker';
import CodePreview from './components/CodePreview';
import ModePicker from './components/ModePIcker';
import getInitialState from './components/animations/getInitialState';
import ToggleButton from './components/ToggleButton';
import Fader from './components/Fader';

function App() {
  // let canvas: any, ctx: any;
  const settingsRef = useRef(null);
  // const [initalized, setInitalized] = useState(false);
  const [mode, setMode] = useState("default");
  const [settings, setSettings] = useState<any>(getInitialState(mode));
  const [titleSettings, setTitleSettings] = useState({
    text: "Banner Ninja",
    isActive: true,
  });
  const [controls, setControls] = useState([]);

  // Set an id for the banner preview
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

  // useEffect to update settings
  useEffect(() => {
    settingsRef.current = settings;
    setControls(

      settings.properties.map((property: any) => {
        switch (property.type) {
          case "color":
            return <ColorPicker key={property.label} value={property.value} attribute={property.attribute} label={property.label} onChange={handleSettingsChange} />
          case "range":
            return <Fader 
                      key={property.label} 
                      label={property.label} 
                      attribute={property.attribute}
                      min={property.min}
                      max={property.max}
                      step={property.step}
                      value={property.value}
                      onChange={handleSettingsChange} />
          default:
            break;
        }
      })
    )
  }, [settings]);

  const handleColorChange = (newColor: {label: string, value: string}) => {
    let labelString: string = newColor.label.toLowerCase();
    setSettings({
      ...settings,
      [labelString]: newColor.value,
    });
  }

  const handleSettingsChange = (e: any) => {
    let [name, value] = [e.target.name, e.target.value];
    if(name !== "increment" && name !== "blur") {
    let newProperties = settings.properties.map((property: any) => {
      if (property.attribute === name) {
        return {...property, value: value};
      } else {
        return property;
      }
    });
    setSettings({
      ...settings,
      properties: newProperties,
    });
  } else if (name === "blur") {
    setSettings({
      ...settings,
      blur: value,
    });
  } else {
    setSettings({
      ...settings,
      increment: value,
    });
  }
  }

  return (
    <div>
        <BannerPreview mode={mode} settings={settingsRef.current} titleSettings={titleSettings} updateSettings={handleSettingsChange}/>
        <div className="container overflow-hidden max-w-6xl flex flex-col p-4 bg-slate-50 mx-auto h-screen justify-start items-center md:items-start">
          <div>
            {/* Top Row */}
            <div className="flex items-start flex-wrap gap-4">
            <ModePicker mode={mode} onClick={(e) => {handleModeChange(e)}} />
            <ToggleButton label={"Toggle Title"} explainer={"(for display only.)"} onClick={toggleTitle} />
            <Fader 
              label={"Blur"} 
              attribute={"blur"}
              min={0}
              max={15}
              step={1}
              value={settings.blur}
              onChange={handleSettingsChange}
            />
            {controls}
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
