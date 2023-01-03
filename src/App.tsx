import { useEffect, useRef, useState, useMemo } from 'react';
import BannerPreview from './components/BannerPreview';
import ColorPicker from './components/ColorPicker';
import CodePreview from './components/CodePreview';
import ModePicker from './components/ModePicker';
import getInitialState from './components/animations/getInitialState';
import ToggleButton from './components/ToggleButton';
import Fader from './components/Fader';

function App() {

  const [mode, setMode] = useState("default");
  const [settings, setSettings] = useState<any>(getInitialState(mode));
  const settingsRef = useRef(settings);
  const [titleSettings, setTitleSettings] = useState({
    text: "Banner Ninja",
    isActive: true,
  });
  const [controls, setControls] = useState([]);

  /**
   * Generate a random hash id for the banner preview
   */
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

  // Update settings.
  useEffect(() => {
    settingsRef.current = settings;
    setControls(

      settings.properties.map((property: any) => {
        switch (property.type) {
          case "color":
            return <ColorPicker key={property.label} value={property.value} attribute={property.attribute} label={property.label} onChange={handleSettingsChange} />
          case "range":
            console.log(property);
            return <Fader 
                      key={property.label} 
                      settings={property}
                      onChange={handleSettingsChange} />
          default:
            break;
        }
      })
    )
  }, [settings]);

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
    <div className="pb-24">
        <BannerPreview mode={mode} settings={settingsRef.current} titleSettings={titleSettings} updateSettings={handleSettingsChange}/>
        <div className="container max-w-6xl p-4 bg-slate-50 mx-auto h-screen justify-start items-center md:items-start">
          <div>
            {/* Top Row */}
            <div className="relative mt-3 p-4 flex flex-wrap items-start gap-3 border-2 border-slate-400 rounded-lg w-full">
              <div className="absolute font-nunito font-bold text-slate-600 pt-px -top-4 px-2 bg-slate-50">General Settings</div>
              <ModePicker mode={mode} onClick={(e: any) => {handleModeChange(e)}} />
              <ToggleButton label={"Toggle Title"} explainer={"(for display only.)"} onClick={toggleTitle} />
              <Fader
                settings={{
                  attribute: "blur",
                  label: "Blur",
                  min: 0,
                  max: 14,
                  step: 1,
                  value: settings.blur,
                  invert: false,
                }}
                onChange={handleSettingsChange}
              />
            </div>
            {/* Mode Specific Settings */}
            <div className="relative mt-6 p-4 flex items-start flex-wrap gap-3 border-2 border-slate-400 rounded-lg w-full">
              <div className="absolute font-nunito font-bold text-slate-600 pt-px -top-4 px-2 bg-slate-50">{mode.charAt(0).toUpperCase() + mode.slice(1)} Settings</div>
            {controls}
            </div>
          </div>
          <div className="p-2"></div>
          {/* Code Preview */}
          <CodePreview idHash={idHash} settings={settings} />
        </div>
    </div>
  )
}

export default App;
