function renderPlasma(size, plasma, increment) {
  let [
    lineColor, backgroundColor, 
    amplitude, count, countOffset, lineWidth, plasmaLength, frequency, jitter, trails, echo, echoOffset, yOffset] = plasma.properties;
    const drawBackground = () => {
      let alpha = (255 - trails.value).toString(16);
      alpha = trails.value >= 240 ? 0 + alpha : alpha;
      this.fillStyle = "none";
      this.save();
      this.fillStyle = backgroundColor.value + alpha;
      this.fillRect(0, 0, size.width, plasma.height);
      this.restore();
    };
    
    const pingPong = (increment, min, max, rate) => {
      // make sure min is less than max
      if (min > max) {
        let temp = min;
        min = max;
        max = temp;
      }
      let range = max - min;
      let progress = Math.abs(Math.sin(increment * rate)) * range;
      return min + progress;
    }

    let activeAmplitude = (amplitude.isAnimated && amplitude.animation.isActive ? 
    pingPong(increment, amplitude.animation.min, amplitude.animation.max, amplitude.animation.rate) 
    : 
    amplitude.value) - 200;
    let activeCount = count.isAnimated && count.animation.isActive ?
    pingPong(increment, count.animation.min, count.animation.max, count.step)
    :
    count.value;
    let activeCountOffset = countOffset.isAnimated && countOffset.animation.isActive ?
    pingPong(increment, countOffset.animation.min, countOffset.animation.max, countOffset.animation.rate)
    :
    countOffset.value;
    let activeLineWidth = lineWidth.isAnimated && lineWidth.animation.isActive ?
    pingPong(increment, lineWidth.animation.min, lineWidth.animation.max, lineWidth.animation.rate)
    :
    lineWidth.value;
    let activeplasmaLength = plasmaLength.max - (plasmaLength.value - plasmaLength.min)

  const drawPlasma = () => {
    this.save();
      let centerY = plasma.height/2;
      this.strokeStyle = lineColor.value.slice(0);
      this.lineWidth = activeLineWidth;
      for (let plasmaCount = 0 ; plasmaCount < activeCount; plasmaCount++) {
        this.beginPath()
        this.moveTo(-25, centerY)
        let previous = -200;
        let calcIncrement = increment * parseFloat(frequency.value);
        let setBack = -lineWidth.max - (echoOffset.value * echo.value);
        for (let i = setBack; i < size.width + 25; i+=1) {
          if (previous < i){
            this.lineTo(
              i, 
              yOffset.value + centerY - (plasmaCount*activeCountOffset) + (count.value*(activeCountOffset/2) - activeCountOffset/2) + Math.sin(i * activeplasmaLength + calcIncrement) * activeAmplitude);
          }
          previous = i;
        }
        this.stroke()
      }
   
    this.restore();
  }

  drawBackground();
  drawPlasma();
  plasma.increment = parseFloat((increment += .01).toFixed(2));
  // plasma.increment = increment += parseFloat(frequency.value);
  return plasma;
}

function createImageData(size) {
  let imageData = new ImageData(size.width, size.height);
  let data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 0; // red
    data[i + 1] = 0; // green
    data[i + 2] = 0; // blue
    data[i + 3] = 255; // alpha
  }
  return imageData;
}

export default renderPlasma;
