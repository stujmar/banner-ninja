function renderWave(size, wave, increment) {
  let [
    lineColor, backgroundColor, 
    amplitude, count, countOffset, lineWidth, waveLength, frequency, jitter, trails, echo, echoOffset] = wave.properties;
    const drawBackground = () => {
      let alpha = (255 - trails.value).toString(16);
      alpha = trails.value >= 240 ? 0 + alpha : alpha;
      this.fillStyle = "none";
      this.save();
      this.fillStyle = backgroundColor.value + alpha;
      this.fillRect(0, 0, size.width, wave.height);
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

    // give a number a random jitter above or below the value.
    const jitterWave = (value) => {
      const getRandomFloat = (min, max) => {
        return Math.random() * (max - min) + min;
      }
      return value + getRandomFloat(-jitter.value, jitter.value);
      // Wip a more interesting jitter.
      return Math.sin((value * (increment + 5)) / 10) * jitter.value + value + (1 * jitter.value);
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
    let activeWaveLength = waveLength.max - (waveLength.value - waveLength.min)

  const drawLine = (_echo) => {
    this.save();
      let centerY = wave.height/2;
      this.strokeStyle = lineColor.value.slice(0);
      this.lineWidth = activeLineWidth;
      for (let waveCount = 0 ; waveCount < activeCount; waveCount++) {
        this.beginPath()
        this.moveTo(-25, centerY)
        let previous = -200;
        let calcIncrement = increment * parseFloat(frequency.value);
        let setBack = -lineWidth.max - (echoOffset.value * echo.value);
        for (let i = setBack; i < size.width + 25; i+=1) {
          if (previous < i){
            this.lineTo(
              i + (_echo * echoOffset.value), 
              jitterWave(centerY - (waveCount*activeCountOffset) + (count.value*(activeCountOffset/2) - activeCountOffset/2) + Math.sin(i * activeWaveLength + calcIncrement) * activeAmplitude))
          }
          previous = i;
        }
        this.stroke()
      }
   
    this.restore();
  }

  drawBackground();
  for (let _echo = 0; _echo < (parseInt(echo.value) + 1); _echo++) {
  drawLine(_echo);
  }
  wave.increment = parseFloat((increment += .01).toFixed(2));
  // wave.increment = increment += parseFloat(frequency.value);
  return wave;
}

export default renderWave;
