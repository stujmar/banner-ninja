import { useEffect, useRef, useState, useMemo } from 'react';
import BannerPreview from './components/BannerPreview';
import ColorPicker from './components/ColorPicker';
import CodePreview from './components/CodePreview';
import Gradient from './components/Gradient';
import ModeSwitcher from './components/ModeSwitcher';
import getInitialState from './components/animations/getInitialState';
import ToggleButton from './components/ToggleButton';
import Fader from './components/Fader';
import Footer from './components/Footer';
import BokehLayers from './components/BokehLayers';

function App() {

  const [mode, setMode] = useState("waves");
  const [blur, setBlur] = useState(0);
  const [settings, setSettings] = useState<any>(getInitialState(mode));
  const settingsRef = useRef(settings);
  const [toggleGeneralSettings, setToggleGeneralSettings] = useState(true);
  const [toggleModeSettings, setToggleModeSettings] = useState(true);
  const [titleSettings, setTitleSettings] = useState({
    text: "Banner Ninja",
    isActive: true,
  });
  const [controls, setControls] = useState([]);
  let theme: string = getTheme(mode);

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
            return <ColorPicker key={property.label} value={property.value} attribute={property.attribute} label={property.label} theme={theme} onChange={handleChangeRouter} />
          case "gradient":
            return <Gradient key={property.label} colors={property.value} attribute={property.attribute} label={property.label} theme={theme} onChange={handleChangeRouter} />
          case "bokehLayers":
            return <BokehLayers key={property.label}  settings={property} theme={theme} onChange={handleChangeRouter} />
          case "range":
            return <Fader 
                      key={property.label} 
                      settings={property}
                      theme={theme}
                      onChange={handleChangeRouter} />
          default:
            break;
        }
      })
    )
    setBlur(settings.blur);
  }, [settings]);

  const handleBaseChange = (name: string, value: number) => {
    setSettings({
      ...settings,
      [name]: value,
    });
    if (name === "blur") {
      setBlur(value);
    }
  };

  const handlePropertyChange = (name: string, value: number) => {
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
  };

  const handleAnimationChange = (name: string, value: number) => {
    let [attribute, aniType] = [name.split("-")[0], name.split("-")[1]];
    let newProperties = settings.properties.map((property: any) => {
      if (property.attribute === attribute) {
        let newAnimation =  {
          "isActive": aniType == "isActive" ? value : property.animation.isActive,
          "min": aniType == "min" ? value : parseFloat(property.animation.min),
          "max": aniType == "max" ? value : parseFloat(property.animation.max),
          "rate": aniType == "rate" ? value : property.animation.rate,
        }
        return {...property, animation: newAnimation};
      } else {
        return property;
      }
    });
    setSettings({
      ...settings,
      properties: newProperties,
    });
  };

  const handleChangeRouter = (e: any) => {
    let [type, name, value] = [e.target.type, e.target.name, e.target.value];
    switch (type) {
      case "base":
        handleBaseChange(name, value);
        break;
      case "property":
        handlePropertyChange(name, value);
        break;
      case "animation":
        handleAnimationChange(name, value);
        break;
    }
  }

  return (
    <div className="pb-24">
        <BannerPreview mode={mode} blur={blur} settings={settingsRef.current} titleSettings={titleSettings} updateSettings={handleChangeRouter}/>
        <div className={`bg-${theme}-50`}>
        <div className={`container max-w-[1090px] p-4 bg-${theme}-50 mx-auto h-screen justify-start items-center md:items-start`}>
          <div>
            {/* Top Row - Border Element */}
            <div className={`relative mt-3 px-1 py-3 sm:p-4 sm:border-2 border-${theme}-400 rounded-lg w-full`}>
            <div className={`sm:hidden -top-1 absolute w-11/12 border-t-2 border-${theme}-400`}></div>
              <button onClick={() => toggleSettingsVisibility("general")} className={`absolute font-nunito font-bold text-${theme}-600 pt-px -top-4 pr-2 sm:px-2 bg-${theme}-50`}>General Settings</button>
              <button onClick={() => toggleSettingsVisibility("general")} className={`absolute select-none focus:outline-none pt-px -top-3.5 right-0 sm:right-3 px-1 bg-${theme}-50`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 stroke-${theme}-500 transition duration-100 ${toggleGeneralSettings ? "" : "-rotate-90"}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {/* General Settings Grid */}
              {toggleGeneralSettings ? <div className="flex flex-wrap items-start gap-3 mt-1 sm:mt-0 module-border sm:no-module-border">
                <ModeSwitcher mode={mode} theme={theme} onClick={(e: any) => {handleModeChange(e)}} />
                <ToggleButton label={"Toggle Title"} explainer={""} theme={theme} onClick={toggleTitle} />
                <Fader
                  settings={{
                    attribute: "blur",
                    label: "Blur",
                    min: 0,
                    max: 14,
                    step: 1,
                    value: settingsRef.current.blur,
                  }}
                  theme={theme}
                  onChange={handleChangeRouter}
                  base={true}
                />
                <Fader
                  settings={{
                    attribute: "height",
                    label: "Height",
                    min: 128,
                    max: 512,
                    step: 8,
                    value: settingsRef.current.height,
                  }}
                  theme={theme}
                  onChange={handleChangeRouter}
                  base={true}
                />

              </div> : null}
            </div>
            {/* Mode Specific Settings */}
            <div className={`relative mt-4 sm:mt-6 px-1 py-3 sm:p-4 sm:border-2 border-${theme}-400 rounded-lg w-full`}>
            <div className={`sm:hidden -top-1 absolute w-11/12 border-t-2 border-${theme}-400`}></div>
              <button onClick={() => toggleSettingsVisibility("mode")} className={`absolute font-nunito font-bold text-${theme}-600 pt-px -top-4 pr-2 sm:px-2 bg-${theme}-50`}>{mode.charAt(0).toUpperCase() + mode.slice(1)} Settings</button>
              <button onClick={() => toggleSettingsVisibility("mode")} className={`absolute select-none focus:outline-none pt-px -top-3.5 right-0 sm:right-3 px-1 bg-${theme}-50`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 stroke-${theme}-500 transition duration-100 ${toggleModeSettings ? "" : "-rotate-90"}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {/* Mode Settings Grid */}
              {toggleModeSettings ?
              <div className="flex flex-wrap items-start gap-3 mt-1 sm:mt-0 module-border sm:no-module-border">
                {controls}
              </div> : null}
            </div>
          </div>
          <div className="p-2"></div>
          {/* Code Preview */}
          <CodePreview idHash={idHash} settings={settings} theme={theme}/>
        <Footer text="Created by Stuart John Marsh" />
        </div>
        </div>

    </div>
  )
}

export default App;

function getTheme(mode: string): string {
  switch (mode) {
    case "waves":
      return "slate";
    case "bokeh":
      return "stone";
    case "plasma":
      return "cosmic";
    default:
      return "slate";
  }
}
