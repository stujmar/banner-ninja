function renderBokeh(size, wave) {
    
    let [circleColor, backgroundColor, count] = wave.properties;
    let circlePositions = wave.persist.circlePositions || {};
    if (Object.keys(circlePositions).length !== parseInt(count.value)) {
        circlePositions = {};
        for (let i = 0; i < count.value; i++) {
            circlePositions[i] = {"x": random(0,1), "y": random(0,1)};
        }
    }


    const drawBackground = () => {
        this.fillStyle = "none";
        this.save();
          this.clearRect(0, 0, size.width, wave.height);
          this.fillStyle = backgroundColor.value;
          this.fillRect(0, 0, size.width, wave.height);
        this.restore();
    }

    const drawCircle = (i) => {
        this.save();
            this.beginPath();
            this.fillStyle = circleColor.value;
            this.arc(circlePositions[i].x * size.width, circlePositions[i].y * wave.height, 50, 0, 2 * Math.PI);
            this.fill();
        this.restore();
    };

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
    for (let i = 0; i < count.value; i++) {
        drawCircle(i);
    }

    wave.persist.circlePositions = circlePositions;
    return wave;
}

export default renderBokeh;