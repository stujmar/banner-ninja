const getCodePreview = (settings: any, hashId: string) => {
  console.log("generating code preview for:", settings.mode, hashId);
  switch (settings.mode) {
    case "wave":
      return generateWaveCodePreview(settings, hashId);
    case "bokeh":
      return generateBokehCodePreview(settings, hashId);
    case "plasma":
      return generatePlasmaCodePreview(settings, hashId);
    default:
      return "default";
  }
}

const generateWaveCodePreview = (settings: any, hashId: string) => {
  return "waveCode";
};

const generateBokehCodePreview = (settings: any, hashId: string) => {
  return "bokehCode";
};

const generatePlasmaCodePreview = (settings: any, hashId: string) => {
  return "plasmaCode";
};

export default getCodePreview;