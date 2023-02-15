function renderWave(size, wave, increment) {
  // console.log("coming into renderWave", increment)
  let [
    lineColor, backgroundColor, 
    amplitude, count, countOffset, lineWidth, waveLength, frequency] = wave.properties;
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
    
    let activeAmplitude = (amplitude.isAnimated && amplitude.animation.isActive ? 
    pingPong(increment, amplitude.animation.min, amplitude.animation.max, amplitude.step) 
    : 
    amplitude.value) - 250;
    let activeCount = count.isAnimated && count.animation.isActive ?
    pingPong(increment, count.animation.min, count.animation.max, count.step)
    :
    count.value;
    let activeCountOffset = countOffset.isAnimated && countOffset.animation.isActive ?
    pingPong(increment, countOffset.animation.min, countOffset.animation.max, countOffset.step)
    :
    countOffset.value;

  const drawLine = () => {
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
            this.lineTo(i, (centerY - (waveCount*activeCountOffset) + (count.value*(activeCountOffset/2) - activeCountOffset/2)) + Math.sin(i * waveLength.value + calcIncrement) * activeAmplitude)
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
