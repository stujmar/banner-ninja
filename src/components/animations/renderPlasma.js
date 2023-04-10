function renderPlasma(size, plasma, increment) {
  let [
    lineColor, backgroundColor, 
    amplitude, count, countOffset, lineWidth, plasmaLength, frequency, jitter, trails, echo, echoOffset, yOffset] = plasma.properties;
    const drawBackground = () => {
      let trailsValue = 0
      let alpha = (255 - trailsValue).toString(16);
      alpha = trailsValue >= 240 ? 0 + alpha : alpha;
      this.fillStyle = "none";
      this.save();
      this.fillStyle = backgroundColor.value + alpha;
      this.fillRect(0, 0, size.width, plasma.height);
      this.restore();
    };

  const drawPlasma = () => {
    this.save();
    // size of our height maps
    const mapSize = 1024;

    // returns the distance of point x,y from the origin 0,0
    const distance = (x, y) => Math.sqrt(x * x + y * y);

    // init height map 1
    const heightMap1 = [];
    for (let u = 0; u < mapSize; u++) {
      for (let v = 0; v < mapSize; v++) {
        // index of coordinate in height map array
        const i = u * mapSize + v;

        // u,v are coordinates with origin at upper left corner
        // cx and cy are coordinates with origin at the
        // center of the map
        const cx = u - mapSize / 2;
        const cy = v - mapSize / 2;

        // distance from middle of map
        const d = distance(cx, cy);

        // stretching so we get the desired ripple density on our map
        const stretch = (3 * Math.PI) / (mapSize / 2);

        // wavy height value between -1 and 1
        const ripple = Math.sin(d * stretch);

        // wavy height value normalized to 0..1
        const normalized = (ripple + 1) / 2;

        // height map value 0..128, integer
        heightMap1[i] = Math.floor(normalized * 128);
      }
    }
    this.restore();
  }

  drawBackground();
  drawPlasma();
  plasma.increment = parseFloat((increment += .01).toFixed(2));
  // plasma.increment = increment += parseFloat(frequency.value);
  return plasma;
}

function createImageData(size) {
  let imageData = new ImageData(size.width, size.height);
  let data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 0; // red
    data[i + 1] = 0; // green
    data[i + 2] = 0; // blue
    data[i + 3] = 255; // alpha
  }
  return imageData;
}

function moveHeightMaps(time) {
  return time;
}

// returns a random color
function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  
  return { r, g, b };
};
// returns a random 5-color gradient palette
function makeRandomPalette() {
  const c1 = randomColor();
  const c2 = randomColor();
  const c3 = randomColor();
  const c4 = randomColor();
  const c5 = randomColor();
  
  return makeFiveColorGradient(c1, c2, c3, c4, c5);
};

function updatePalette(t) {
  const timeScale = 0.0005;
  const x = t * timeScale;
  
  // normalized value 0..1 used to interpolate palette colors
  const inter = (Math.cos(x) + 1) / 2;
  // create interpolated palette for current frame
  for (let i = 0; i < 256; i++) {
    palette[i] = interpolate(palettes[0][i], palettes[1][i], inter);
  }
};

function updateImageData() {
  for (let u = 0; u < imgSize; u++) {
    for (let v = 0; v < imgSize; v++) {
      // indexes into height maps for pixel
      const i = (u + dy1) * mapSize + (v + dx1);
      const k = (u + dy2) * mapSize + (v + dx2);

      // index for pixel in image data
      // remember it's 4 bytes per pixel
      const j = u * imgSize * 4 + v * 4;

      // height value of 0..255
      let h = heightMap1[i] + heightMap2[k];

      // greyscale color according to height
      let c = { r: h, g: h, b: h };

      // set pixel data
      image.data[j] = c.r;
      image.data[j + 1] = c.g;
      image.data[j + 2] = c.b;
    }
  }
}

export default renderPlasma;
