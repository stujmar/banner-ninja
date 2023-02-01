import { useEffect, useRef, useState, useMemo } from 'react';
import BannerPreview from './components/BannerPreview';
import ColorPicker from './components/ColorPicker';
import CodePreview from './components/CodePreview';
import ModeSwitcher from './components/ModeSwitcher';
import getInitialState from './components/animations/getInitialState';
import ToggleButton from './components/ToggleButton';
import Fader from './components/Fader';
import Footer from './components/Footer';

function App() {

  const [mode, setMode] = useState("default");
  const [settings, setSettings] = useState<any>(getInitialState(mode));
  const settingsRef = useRef(settings);
  const [toggleGeneralSettings, setToggleGeneralSettings] = useState(true);
  const [toggleModeSettings, setToggleModeSettings] = useState(true);
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

  const toggleSettingsVisibility = (setting: string) => {
    if (setting === "general") {
      setToggleGeneralSettings(!toggleGeneralSettings);
    } else {
      setToggleModeSettings(!toggleModeSettings);
    }
  };

  // Update settings.
  useEffect(() => {
    settingsRef.current = settings;
    setControls(

      settings.properties.map((property: any) => {
        switch (property.type) {
          case "color":
            return <ColorPicker key={property.label} value={property.value} attribute={property.attribute} label={property.label} onChange={handlePropertyChange} />
          case "range":
            return <Fader 
                      key={property.label} 
                      settings={property}
                      onChange={handlePropertyChange} />
          default:
            break;
        }
      })
    )
  }, [settings]);

  const handlePropertyChange = (e: any) => {
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

  const handleSettingsChange = (e: any) => {
    // console.log(e.target.name, e.target.value);
    let [name, value] = [e.target.name, e.target.value];
    setSettings({
      ...settings,
      [name]: value,
    });
  }

  return (
    <div className="pb-24">
      
        <BannerPreview mode={mode} settings={settingsRef.current} titleSettings={titleSettings} updateSettings={handlePropertyChange}/>
        <div className="container max-w-6xl p-4 bg-slate-50 mx-auto h-screen justify-start items-center md:items-start">
          <div>
            {/* Top Row - Border Element */}
            <div className="relative mt-3 px-1 py-3 sm:p-4 sm:border-2 border-slate-400 rounded-lg w-full">
            <div className="sm:hidden -top-1 absolute w-11/12 border-t-2 border-slate-400"></div>
              <button onClick={() => toggleSettingsVisibility("general")} className="absolute font-nunito font-bold text-slate-600 pt-px -top-4 pr-2 sm:px-2 bg-slate-50">General Settings</button>
              <button onClick={() => toggleSettingsVisibility("general")} className="absolute select-none focus:outline-none pt-px -top-3.5 right-0 sm:right-3 px-1 bg-slate-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 stroke-slate-500 transition duration-100 ${toggleGeneralSettings ? "" : "-rotate-90"}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {/* General Settings Grid */}
              {toggleGeneralSettings ? <div className="flex flex-wrap items-start gap-3 module-border sm:no-module-border">
                <ModeSwitcher mode={mode} onClick={(e: any) => {handleModeChange(e)}} />
                <ToggleButton label={"Toggle Title"} explainer={"(for display only.)"} onClick={toggleTitle} />
                <Fader
                  settings={{
                    attribute: "blur",
                    label: "Blur",
                    min: 0,
                    max: 14,
                    step: 1,
                    value: settingsRef.current.blur,
                    invert: false,
                  }}
                  onChange={handleSettingsChange}
                />
                <Fader
                  settings={{
                    attribute: "height",
                    label: "Height",
                    min: 128,
                    max: 1024,
                    step: 8,
                    value: settingsRef.current.height,
                    invert: false,
                  }}
                  onChange={handleSettingsChange}
                />

              </div> : null}
            </div>
            {/* Mode Specific Settings */}
            <div className="relative mt-4 sm:mt-6 px-1 py-3 sm:p-4 sm:border-2 border-slate-400 rounded-lg w-full">
            <div className="sm:hidden -top-1 absolute w-11/12 border-t-2 border-slate-400"></div>
              <button onClick={() => toggleSettingsVisibility("mode")} className="absolute font-nunito font-bold text-slate-600 pt-px -top-4 pr-2 sm:px-2 bg-slate-50">{mode.charAt(0).toUpperCase() + mode.slice(1)} Settings</button>
              <button onClick={() => toggleSettingsVisibility("mode")} className="absolute select-none focus:outline-none pt-px -top-3.5 right-0 sm:right-3 px-1 bg-slate-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 stroke-slate-500 transition duration-100 ${toggleModeSettings ? "" : "-rotate-90"}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {/* Mode Settings Grid */}
              {toggleModeSettings ?
              <div className="flex flex-wrap items-start gap-3 module-border sm:no-module-border">
                {controls}
              </div> : null}
            </div>
          </div>
          <div className="p-2"></div>
          {/* Code Preview */}
          <CodePreview idHash={idHash} settings={settings} />
        <Footer text="Created by Stuart John Marsh" />
        </div>
    </div>
  )
}

export default App;
