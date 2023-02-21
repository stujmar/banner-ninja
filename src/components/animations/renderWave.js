function renderWave(size, wave, increment) {
  let [
    lineColor, backgroundColor, 
    amplitude, count, countOffset, lineWidth, waveLength, frequency, jitter, trails] = wave.properties;
    const drawBackground = () => {
      let alpha = (255 - trails.value).toString(16);
      alpha = trails.value >= 240 ? 0 + alpha : alpha;
      this.fillStyle = "none";
      this.save();
      this.fillStyle = backgroundColor.value + alpha;
      this.fillRect(0, 0, size.width, wave.height);
      this.restore();
    };
    
    const pingPongXX = (value, min, max, step) => {
      let rate = parseFloat(value.toFixed(2)) * 100 * step;
      let range = max - min;
      let result = (rate - min) % (range * 2);
      if (result < 0) {
        result += range * 2;
      }
      return min + (result > range ? range * 2 - result : result);
    }

    const pingPong = (increment, min, max, rate) => {
      // make sure min is less than max
      if (min > max) {
        let temp = min;
        min = max;
        max = temp;
      }
      // console.log("pingPong", increment, min, max, rate)
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
    pingPong(increment, amplitude.animation.min, amplitude.animation.max, amplitude.step) 
    : 
    amplitude.value) - 250;
    let activeCount = count.isAnimated && count.animation.isActive ?
    pingPong(increment, count.animation.min, count.animation.max, count.step)
    :
    count.value;
    let activeCountOffset = countOffset.isAnimated && countOffset.animation.isActive ?
    pingPong(increment, countOffset.animation.min, countOffset.animation.max, countOffset.animation.rate)
    :
    countOffset.value;

  const drawLine = () => {
    // console.log("drawLine", increment);
    this.save();
      let centerY = wave.height/2;
      this.strokeStyle = lineColor.value.slice(0);
      this.lineWidth = lineWidth.value;
      for (let waveCount = 0 ; waveCount < activeCount; waveCount++) {
        this.beginPath()
        this.moveTo(-25, centerY)
        let previous = -200;
        let calcIncrement = increment * parseFloat(frequency.value);
        for (let i = -10; i < size.width + 25; i+=1) {
          if (previous < i){
            this.lineTo(
              i, 
              jitterWave((centerY - (waveCount*activeCountOffset) + (count.value*(activeCountOffset/2) - activeCountOffset/2)) + Math.sin(i * waveLength.value + calcIncrement) * activeAmplitude))
          }
          previous = i;
        }
        this.stroke()
      }
   
    this.restore();
  }

  drawBackground();
  drawLine();
  wave.increment = parseFloat((increment += .01).toFixed(2));
  // wave.increment = increment += parseFloat(frequency.value);
  return wave;
}

export default renderWave;
