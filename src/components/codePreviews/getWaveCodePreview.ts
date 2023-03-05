export const generateWaveCodePreview = (settings: any, hashId: string) => {
    let [ lineColor, backgroundColor, amplitude, count, countOffset, lineWidth, waveLength, frequency, jitter, trails, echo, echoOffset ] = settings.properties;
    let activeFrequency = parseFloat((waveLength.max - (waveLength.value - waveLength.min)).toFixed(4));
    function getAnimatedValue(value: any) {
      return `pingPong(increment, ${value.min}, ${value.max}, ${value.rate});`;
    }
    
    const prefix = `  <canvas id="bannerCanvas_${hashId}"></canvas>
  <script>`
    const javaScriptBody = `
    let ctx;
    let increment = 0;
    let count = ${count.value};
    let jitter = ${jitter.value};
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
      let frequency = ${parseFloat(frequency.value)}*increment;
      let countOffset = ${countOffset.isAnimated && countOffset.animation.isActive ? getAnimatedValue(countOffset.animation) : `${countOffset.value};`}
      ctx.lineWidth = ${lineWidth.isAnimated && lineWidth.animation.isActive ? getAnimatedValue(lineWidth.animation) : `${lineWidth.value};`}
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "${lineColor.value}";
      for (let c = 0; c < count; c++) {
        let offsetY = (c*countOffset) - (count*countOffset/2) + (countOffset/2);
        ctx.beginPath();
        ctx.moveTo(-5, canvas.height / 2);
        for (let i = -${lineWidth.max}; i < canvas.width; i++) {
          if (i > previousX) {
          ctx.lineTo(i, applyJitter((centerY - (offsetY) + Math.sin(i * ${activeFrequency} + frequency) * ${amplitude.value - (amplitude.max/2)})));
          }
          previousX = i;
        }
        ctx.stroke();
      }
      increment += .01;
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

    function applyJitter(value) {
      function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
        }
      return value + getRandomArbitrary(-jitter, jitter);
    }

    function pingPong(increment, min, max, rate) {
      if (min > max) {
        let temp = min;
        min = max;
        max = temp;
      }
      let range = max - min;
      let progress = Math.abs(Math.sin(increment * rate)) * range;
      return min + progress;
    }
`
  const suffix = `  </script>`
    return prefix + javaScriptBody + suffix;
  };

