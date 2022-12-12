function renderWave(size, wave) {
  let [lineColor, backgroundColor, amplitude, lineWidth, waveLength, frequency] = wave.properties;
  let increment = wave.increment;

  const drawBackground = () => {
    this.fillStyle = "none";
    this.save();
      this.clearRect(0, 0, size.width, size.height);
      this.fillStyle = backgroundColor.value;
      this.fillRect(0, 0, size.width, size.height);
    this.restore();
  };

  const drawLine = () => {
    
    this.save();
      let centerY = size.height/2;
      this.strokeStyle = lineColor.value.slice(0);
      this.lineWidth = lineWidth.value;
      for (let waveCount = 0 ; waveCount < 3; waveCount++) {
        this.beginPath()
        this.moveTo(-25, centerY)
        let previous = -200;
        for (let i = -10; i < size.width + 25; i+=1) {
          if (previous < i){
            this.lineTo(i, (centerY - (waveCount*50) + 50) + Math.sin(i * waveLength.value + increment) * amplitude.value)
          }
          previous = i;
        }
        this.stroke()
      }
   
    this.restore();
  }

  drawBackground();
  drawLine();
  increment += frequency.value;
  return increment;
}

export default renderWave;
