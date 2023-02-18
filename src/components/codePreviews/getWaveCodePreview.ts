export const generateWaveCodePreview = (settings: any, hashId: string) => {
    let [ lineColor, backgroundColor, amplitude, count, countOffset, lineWidth, waveLength, frequency ] = settings.properties;
    const prefix = `  <canvas id="bannerCanvas_${hashId}"></canvas>
  <script>`
    const javaScriptBody = `
    let ctx;
    let increment = 0;
    const canvas = document.getElementById("bannerCanvas_${hashId}");
    establishContext();
    window.onresize = function() {
      establishContext();
    };
    function establishContext() {
        canvas.width = window.outerWidth;
        canvas.height = ${settings.height}};
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "${backgroundColor.value}";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    function step() {
      ctx.beginPath();
      ctx.moveTo(-5, canvas.height / 2);
      ctx.lineTo(canvas.width +5, canvas.height / 2);
      ctx.strokeStyle = "${lineColor.value}";
      ctx.stroke();
      increment += .01;
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
`
  const suffix = `  </script>`
    return prefix + javaScriptBody + suffix;
  };