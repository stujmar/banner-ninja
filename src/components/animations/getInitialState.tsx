type waveSettings = {
  x: number;
  y: number;
  radius: number;
  amplitude: number;
  trails: number;
  lineWidth: number;
  echo: number;
  echoOffset: number;
  bachground: string;
  foreground: string;
};

function getInitialState(mode: string) {
  switch (mode) {
    case "wave":
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
      };
    case "plasma":
      return {
        color: "#DCE775",
        x: 0,
        y: 0,
      };
    case "default":
      return {
        color: "#DCE775",
        x: 0,
        y: 0,
      };
  }
}

export default getInitialState;