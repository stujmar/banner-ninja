export const generateBokehCodePreview = (settings: any, hashId: string) => {
  let [circleColor, backgroundColor, count] = settings.properties;
  const prefix = `  <canvas id="bannerCanvas_${hashId}" style="width: 100%; height:${settings.height}px;"></canvas>
  <script>`
  const javaScriptBody = `
    const canvas = document.getElementById("bannerCanvas_${hashId}");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "${backgroundColor.value}";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
`
const suffix = `  </script>`
  return prefix + javaScriptBody + suffix;
};