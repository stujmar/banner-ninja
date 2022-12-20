// Import waves.json as variable
import bokeh from './parameters/bokeh.json';
import plasma from './parameters/plasma.json';
import defaultSettings from './parameters/default.json';
import waves from './parameters/waves.json';

const getInitialState = (mode: string) => {
  switch (mode) {
    case "waves":
      return waves;
    case "bokeh":
      return bokeh;
    case "plasma":
      return plasma;
    case "default": 
      return defaultSettings;
  };
}

export default getInitialState;
