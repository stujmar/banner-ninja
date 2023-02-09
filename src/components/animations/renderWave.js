function renderWave(size, wave) {
  let [
    lineColor, backgroundColor, 
    amplitude, count, countOffset, lineWidth, waveLength, frequency] = wave.properties;
  let increment = wave.increment;
  let offset = countOffset.value;
  const drawBackground = () => {
    this.fillStyle = "none";
    this.save();
      this.clearRect(0, 0, size.width, wave.height);
      this.fillStyle = backgroundColor.value;
      this.fillRect(0, 0, size.width, wave.height);
    this.restore();
  };

  const pingPong = (value, min, max, step) => {
    let rate = parseFloat(value.toFixed(2)) * 100 * step;
    let range = max - min;
    let result = (rate - min) % (range * 2);
    if (result < 0) {
      result += range * 2;
    }
    return min + (result > range ? range * 2 - result : result);
  }

  let activeAmplitude = amplitude.isAnimated && amplitude.animation.isActive ? 
    pingPong(increment, amplitude.animation.min, amplitude.animation.max, amplitude.step) 
    : 
    amplitude.value;
  console.log(activeAmplitude)
  const drawLine = () => {
    this.save();
      let centerY = wave.height/2;
      this.strokeStyle = lineColor.value.slice(0);
      this.lineWidth = lineWidth.value;
      for (let waveCount = 0 ; waveCount < count.value; waveCount++) {
        this.beginPath()
        this.moveTo(-25, centerY)
        let previous = -200;
        for (let i = -10; i < size.width + 25; i+=1) {
          if (previous < i){
            this.lineTo(i, (centerY - (waveCount*offset) + (count.value*(offset/2) - offset/2)) + Math.sin(i * waveLength.value + increment) * activeAmplitude)
          }
          previous = i;
        }
        this.stroke()
      }
   
    this.restore();
  }

  drawBackground();
  drawLine();
  wave.increment += parseFloat(frequency.value);
  // wave.increment += .2;
  return wave;
}

export default renderWave;
