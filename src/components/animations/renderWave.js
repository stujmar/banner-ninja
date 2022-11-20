function renderWave(size, wave) {
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

  drawCircle(wave);
}

export default renderWave;
