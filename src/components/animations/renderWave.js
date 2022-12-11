function renderWave(size, wave) {
  let [lineColor, backgroundColor, amplitude, frequency, lineWidth] = wave.properties;
  
  const drawBackground = () => {
    this.fillStyle = "none";
    this.save();
      this.clearRect(0, 0, size.width, size.height);
      this.fillStyle = backgroundColor.value;
      this.fillRect(0, 0, size.width, size.height);
      // this.fill();
    this.restore();
  };

  const drawLine = () => {
    this.save();
      let centerY = size.height/2;
      this.strokeStyle = lineColor.value.slice(0);
      this.lineWidth = lineWidth.value;
      for (let waveCount = 0 ; waveCount < 3; waveCount++) {
        this.beginPath()
        this.moveTo(-lineWidth.value, centerY)
        let previous = -200;
        for (let i = 50; i < size.width + lineWidth.value; i+=1) {
          if (previous < i){
            this.lineTo(i - (lineWidth.value/2) -50, (centerY - (waveCount*50) + 50) + Math.sin(i * frequency.value) * amplitude.value)
          }
          previous = i;
        }
        this.stroke()
      }
      // this.closePath();
      // this.fillStyle = "none";
      // this.fill();
    this.restore();

    //   for (let waveCount = 1; waveCount <= wave.echo + 1; waveCount++) {
    //     this.beginPath();
    //     this.moveTo(-wave.lineWidth, size.height/2);
    //     let previous = -200;
    //     for (let i = -wave.lineWidth; i < size.width + 10; i++) { 
    //       if (i > previous) {
    //         this.lineTo(i, (wave.y - (waveCount * wave.offset)) + Math.sin(i * wave.length + wave.x) * wave.amplitude * Math.sin(wave.x));
    //         previous = i;
    //       }
    //     }
    //     this.lineWidth = wave.lineWidth;
    //     this.stroke();
    // }
  }

  drawBackground();
  drawLine();

}

export default renderWave;
