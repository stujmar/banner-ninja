function renderPlasma(size, plasma, increment) {
  let [plasmaColor, speed] = plasma.properties;
    const drawBackground = () => {
      let trailsValue = 0
      let alpha = (255 - trailsValue).toString(16);
      alpha = trailsValue >= 240 ? 0 + alpha : alpha;
      this.fillStyle = "green";
      this.save();
      this.fillStyle = plasmaColor.value[0].value + alpha;
      this.fillRect(0, 0, size.width, plasma.height);
      this.restore();
    };
  let palettes = [
    makeFiveColorGradient(plasmaColor.value[0].value, plasmaColor.value[1].value, plasmaColor.value[2].value, plasmaColor.value[3].value, plasmaColor.value[4].value), 
    makeFiveColorGradient(plasmaColor.value[0].value, plasmaColor.value[1].value, plasmaColor.value[2].value, plasmaColor.value[3].value, plasmaColor.value[4].value)];
  let palette = {};
  let imgSize = 512;
  let dx1 = 0;
  let dy1 = 0;

  let dx2 = 0;
  let dy2 = 0;

  
    const image = this.createImageData(size.width, plasma.height);
    this.canvas.width = imgSize;
    this.canvas.height = imgSize;
    // const image = this.createImageData(imgSize, imgSize);
    for (let i = 0; i < image.data.length; i += 4) {
      image.data[i] = 0; // R
      image.data[i + 1] = 0; // G
      image.data[i + 2] = 0; // B
      image.data[i + 3] = 255; // A
    }
    // returns the distance of point x,y from the origin 0,0
    const distance = (x, y) => Math.sqrt(x * x + y * y);
    const mapSize = 1024;
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

    const heightMap2 = [];
    for (let u = 0; u < mapSize; u++) {
      for (let v = 0; v < mapSize; v++) {
        const i = u * mapSize + v;
        const cx = u - mapSize / 2;
        const cy = v - mapSize / 2;

        // skewed distance as input to chaos field calculation,
        // scaled for smoothness over map distance
        const d1 = distance(0.8 * cx, 1.3 * cy) * 0.022;
        const d2 = distance(1.35 * cx, 0.45 * cy) * 0.022;

        const s = Math.sin(d1);
        const c = Math.cos(d2);
        // height value between -2 and +2
        const h = s + c;

        // height value between 0..1
        const normalized = (h + 2) / 4;
        // height value between 0..127, integer
        heightMap2[i] = Math.floor(normalized * 127);
      }
    }

    

  const drawPlasma = () => {
    // console.log(image);
    this.save();
    // draw circle on canvas
    this.beginPath();
    this.strokeStyle = "white";
    this.arc(size.width / 2, plasma.height / 2, 100, 0, 2 * Math.PI);
    // draw a rectangle on canvas
    this.rect(0, 0, 10, 10);
    // draw text on canvas
    this.font = "30px Arial";
    this.strokeText(size.width, 10, 50);
    this.strokeText(size.height, 10, 100);
    this.strokeText(plasma.width, 175, 50);
    this.strokeText(plasma.height, 175, 100);
    this.stroke();
    this.restore();
    console.log(plasmaColor.value);
    moveHeightMaps(increment);
    updatePalette(increment, palette);
    updateImageData();
    this.restore();
  }

  drawBackground();
  drawPlasma();
  this.putImageData(image, 0, 0);
  plasma.increment = parseFloat((increment += .01).toFixed(2));
  // plasma.increment = increment += parseFloat(frequency.value);
  return plasma;


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

function interpolate(c1, c2, f) {
  console.log(c1, c2, f)
  c1 = hexToRgb(c1);
  c2 = hexToRgb(c2);
  console.log(c1, c2, f)
  console.log(c1, c1?.r)
  return {
    r: Math.floor(c1.r + (c2.r - c1.r) * f),
    g: Math.floor(c1.g + (c2.g - c1.g) * f),
    b: Math.floor(c1.b + (c2.b - c1.b) * f)
  };
};

function makeFiveColorGradient(c1, c2, c3, c4, c5) {
  const g = [];

  for (let i = 0; i < 64; i++) {
    const f = i / 64;
    g[i] = interpolate(c1, c2, f);
  }

  for (let i = 64; i < 128; i++) {
    const f = (i - 64) / 64;
    g[i] = interpolate(c2, c3, f);
  }

  for (let i = 128; i < 192; i++) {
    const f = (i - 128) / 64;
    g[i] = interpolate(c3, c4, f);
  }

  for (let i = 192; i < 256; i++) {
    const f = (i - 192) / 64;
    g[i] = interpolate(c4, c5, f);
  }

  return g;
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

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

}

export default renderPlasma;
