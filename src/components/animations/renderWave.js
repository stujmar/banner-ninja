function renderWave(size, wave) {
  let [lineColor, backgroundColor, amplitude, frequency, lineWidth] = wave.properties;
  
  const drawBackground = () => {
    this.save();
    this.clearRect(0, 0, size.width, size.height);
    this.fillStyle = backgroundColor.value;
    this.rect(0, 0, size.width, size.height/2);
    // this.fill();
    this.restore();
  };

  const drawLine = () => {
    this.save();
    let centerY = size.height/2;
    let previousX = -10;
    this.strokeStyle = lineColor.value.slice(0);
    this.lineWidth = lineWidth.value;
    this.beginPath()
    this.moveTo(-lineWidth.value, centerY)
    for (let i = 50; i < size.width - 50; i+=10) {
        this.lineTo(i -10, centerY + Math.sin(i * 0.01) * amplitude.value)
    }
    this.fillStyle = "none";
    // this.closePath();
    this.stroke()
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
