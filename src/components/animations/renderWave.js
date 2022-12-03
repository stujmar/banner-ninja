function renderWave(size, wave) {
  // console.log("rendering", size);
  this.fillStyle = wave.background;
  this.rect(0, 0, size.width, size.height);
  this.fill();

  const drawCircle = (wave) => {
    this.save();
    this.beginPath();
    this.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
    this.fillStyle = wave.foreground;
    this.globalAlpha = wave.alpha;
    this.fill();
    this.closePath();
    this.restore();
  };
  // console.log(wave)
  const drawLine = (wave) => {
    this.strokeStyle = wave.foreground.slice(0);
    this.lineWidth = wave.lineWidth;
    this.beginPath()
    this.moveTo(0, size.height/2)
    this.lineTo(size.width, size.height/2)
    this.stroke()
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
