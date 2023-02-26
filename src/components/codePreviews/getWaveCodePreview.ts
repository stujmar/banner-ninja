export const generateWaveCodePreview = (settings: any, hashId: string) => {
    let [ lineColor, backgroundColor, amplitude, count, countOffset, lineWidth, waveLength, frequency, jitter, trails, echo, echoOffset ] = settings.properties;
    let activeFrequency = parseFloat((waveLength.max - (waveLength.value - waveLength.min)).toFixed(4));
    const prefix = `  <canvas id="bannerCanvas_${hashId}"></canvas>
  <script>`
    const javaScriptBody = `
    let ctx;
    let increment = 0;
    let count = ${count.value};
    let countOffset = ${countOffset.value};
    const canvas = document.getElementById("bannerCanvas_${hashId}");
    establishContext();
    window.onresize = function() {
      establishContext();
    };
    function establishContext() {
        canvas.width = window.outerWidth;
        canvas.height = ${settings.height};
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "${backgroundColor.value}";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    function step() {
      let centerY = canvas.height/2;
      let previousX = -100;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = ${lineWidth.value};
      ctx.strokeStyle = "${lineColor.value}";
      for (let c = 0; c < count; c++) {
        let offsetY = (c*countOffset) - (count*countOffset/2) + (countOffset/2);
        ctx.beginPath();
        ctx.moveTo(-5, canvas.height / 2);
        for (let i = -${lineWidth.max}; i < canvas.width; i++) {
          if (i > previousX) {
          ctx.lineTo(i, (centerY - (offsetY) + Math.sin(i * ${activeFrequency} + increment) * ${amplitude.value - (amplitude.max/2)}));
          }
          previousX = i;
        }
        ctx.stroke();
      }
      increment += .01;
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
`
  const suffix = `  </script>`
    return prefix + javaScriptBody + suffix;
  };