function renderBokeh(size, settings) {
    
    let [circleColor, backgroundColor, bokehLayers] = settings.properties;
    let layerCirclePositions = settings.persist.circlePositions || {};
    if (Object.keys(layerCirclePositions).length !== parseInt(bokehLayers.layers.length)) {
        // circlePositions = {};
        layerCirclePositions = {};
        // for (let i = 0; i < count.value; i++) {
        //     circlePositions[i] = {"x": random(0,1), "y": random(0,1)};
        // }
        for(let i = 0; i < bokehLayers.layers.length; i++) {
            layerCirclePositions[i] = {};
            for (let j = 0; j < bokehLayers.layers[i].count.value; j++) {
                layerCirclePositions[i][j] = {"x": random(0,1), "y": random(0,1)};
            }
        }
    }


    const drawBackground = () => {
        this.fillStyle = "none";
        this.save();
          this.clearRect(0, 0, size.width, settings.height);
          this.fillStyle = backgroundColor.value;
          this.fillRect(0, 0, size.width, settings.height);
        this.restore();
    }

    const drawCircle = (i) => {
        this.save();
            this.beginPath();
            this.fillStyle = circleColor.value;
            this.arc(circlePositions[i].x * size.width, circlePositions[i].y * settings.height, 50, 0, 2 * Math.PI);
            this.fill();
        this.restore();
    }

    const drawLayers = (i) => {
        bokehLayers.layers.forEach((layer, index) => {
            for (let i = 0; i < layer.count.value; i++) {
                this.save();
                    this.beginPath();
                    this.fillStyle = layer.color;
                    this.arc(layerCirclePositions[index][i].x * size.width, layerCirclePositions[index][i].y * settings.height, 50, 0, 2 * Math.PI);
                    this.fill();
                this.restore();
            }
        })
    }

    function random(min, max) {
        return parseFloat((Math.random() * (max - min) + min).toFixed(2));
    }

    const pingPong = (value, min, max, step) => {
        let rate = parseFloat(value.toFixed(2)) * 100 * step;
        let range = max - min;
        let result = (rate - min) % (range * 2);
        if (result < 0) {
          result += range * 2;
        }
        return min + (result > range ? range * 2 - result : result);
    }
    drawBackground();
    drawLayers();
    // for (let i = 0; i < count.value; i++) {
    //     drawCircle(i);
    // }

    settings.persist.circlePositions = layerCirclePositions;
    return settings;
}

export default renderBokeh;