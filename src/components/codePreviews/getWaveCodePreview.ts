export const generateWaveCodePreview = (settings: any, hashId: string) => {
    let [ lineColor, backgroundColor, amplitude, count, countOffset, lineWidth, waveLength, frequency ] = settings.properties;
    const prefix = ` <canvas id="bannerCanvas_${hashId}" style="width: 100%; height:256px;"></canvas>`
    const javaScriptBody = `
    const canvas = document.getElementById("bannerCanvas_${hashId}");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "${backgroundColor.value}";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
`
  const suffix = `  </script>`
    return prefix + javaScriptBody + suffix;
  };