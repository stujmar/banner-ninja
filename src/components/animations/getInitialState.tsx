const getInitialState = (mode: string) => {
  switch (mode) {
    case "waves":
      return {
        mode: "waves",
        x: 0,
        y: 100,
        radius: 15,
        properties: [
          {
            label: "Amplitude",
            attribute: "amplitude",
            type: "range",
            min: -500,
            max: 500,
            value: 144,
            step: 1
          },
          {
            label: "Frequency",
            attribute: "frequency",
            type: "range",
            min: 0.01, 
            max: 0.5,
            value: 0.012,
            step: 0.001
          },
          {
            label: "Line Color",
            attribute: "lineColor",
            type: "color",
            value: "#000000"
          },
          {
            label: "Line Width",
            attribute: "lineWidth",
            type: "range",
            min: 1,
            max: 20,
            value: 7.2,
            step: 1
          },
        ],
        trails: 0.016,
        echo: 10,
        echoOffset: 120,
        background: "#dce775",
        foreground: "#000000",
      }
    case "default": 
    return {
      mode: "default",
      properties: [
        {
          label: "Color",
          type: "color",
          value: "#cbd5e1"
        }
      ],
      background: "#00FF00",
    }
  };
}

export default getInitialState;
