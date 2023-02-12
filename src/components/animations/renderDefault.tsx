function renderDefault(this: any, size: any, wave: any) {
  let [ color ] = wave.properties;
  this.fillStyle = color.value;
  this.rect(0, 0, size.width, wave.height);
  this.fill();
}

export default renderDefault;
