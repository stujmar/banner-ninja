const getInitialState = (mode: string) => {
  switch (mode) {
    case "waves":
      return {
        x: 0,
        y: 100,
        radius: 15,
        amplitude: 144,
        frequency: 0.012,
        trails: 0.016,
        lineWidth: 7.2,
        echo: 10,
        echoOffset: 120,
        background: "#dce775",
        foreground: "#000000",
      }
    case "default": 
    return {
      background: "#00FF00",
    }
  };
}

export default getInitialState;
