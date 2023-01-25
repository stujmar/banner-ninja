import { generateWaveCodePreview } from "./getWaveCodePreview";
import { generateBokehCodePreview } from "./getBokehCodePreview";
import { generatePlasmaCodePreview } from "./getPlasmaCodePreview";

const getCodePreview = (settings: any, hashId: string) => {
  switch (settings.mode) {
    case "waves":
      return generateWaveCodePreview(settings, hashId);
    case "bokeh":
      return generateBokehCodePreview(settings, hashId);
    case "plasma":
      return generatePlasmaCodePreview(settings, hashId);
    default:
      return "default";
  }
}

export default getCodePreview;