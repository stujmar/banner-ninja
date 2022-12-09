function renderWave(size, wave) {
  this.fillStyle = wave.background;
  this.rect(0, 0, size.width, size.height);
  this.fill();

  let [amplitude, frequency, lineColor, lineWidth] = wave.properties;

  const drawCircle = (wave) => {

    this.save();
    this.beginPath();
    this.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
    this.fillStyle = wave.foreground;
    this.globalAlpha = wave.alpha;
    // this.fill();
    this.closePath();
    this.restore();
  };

  const drawLine = (wave) => {
    this.save();
    let centerY = size.height/2;
    let previousX = -1;
    this.strokeStyle = wave.foreground.slice(0);
    this.lineWidth = lineWidth.value;
    this.beginPath()
    this.moveTo(-lineWidth.value, centerY)
    for (let i = 0; i < size.width; i++) {
      if (i > previousX) {
        this.lineTo(i, centerY + Math.sin(i * 0.01) * amplitude.value)
      }
    }
    this.fillStyle = "none";
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

  drawLine(wave);
}

export default renderWave;
