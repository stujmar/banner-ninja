function renderBokeh(size, wave) {
    let [circleColor, backgroundColor] = wave.properties;
    const drawBackground = () => {
        this.fillStyle = "none";
        this.save();
          this.clearRect(0, 0, size.width, wave.height);
          this.fillStyle = backgroundColor.value;
          this.fillRect(0, 0, size.width, wave.height);
        this.restore();
    }

    const drawCircle = () => {
        this.save();
            this.beginPath();
            // make circle fill red
            this.fillStyle = circleColor.value;
            this.arc(100, 75, 50, 0, 2 * Math.PI);
            this.stroke();
            this.fill();
        this.restore();
    };

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
    drawCircle();
    return wave;
}

export default renderBokeh;