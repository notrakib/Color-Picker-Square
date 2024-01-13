export const kernelFunction = function (width, height, hue) {
  const imageSize = width * height;
  const imageDataLength = imageSize * 4;
  const i = this.thread.x;

  const y = Math.floor(i / (height * 4));
  const x = Math.floor(i / 4 - y * width);
  const channel = i % 4;

  const yAxisColor = (height - y) / height; // Calculates the range according to y-axis
  if (channel === 0) {
    return changeRed(hue) * yAxisColor;
  } else if (channel === 1) {
    return changeGreen(hue) * yAxisColor;
  } else if (channel === 2) {
    return changeBlue(hue) * yAxisColor;
  } else if (channel === 3) {
    return (x / width) * 255; // Calculates the range according to x-axis for the white fading
  }

  // This function calculates for Blue channel & gives result in terms of hue
  function changeBlue(hue) {
    const hueAbsolute = hue * 360; // Converts the hue range from 0-1 to 0-360
    if (hueAbsolute < 121) {
      return 0;
    } else if (hueAbsolute > 120 && hueAbsolute < 181) {
      const delta = 180 - hueAbsolute;
      return Math.floor(4.25 * delta);
    } else if (hueAbsolute > 300 && hueAbsolute < 361) {
      const delta = 360 - hueAbsolute;
      return 255 - Math.floor(4.25 * delta);
    }
    return 255;
  }

  // This function calculates for Red channel & gives result in terms of hue
  function changeRed(hue) {
    const hueAbsolute = hue * 360;
    if (hueAbsolute > 60 && hueAbsolute < 121) {
      const delta = 120 - hueAbsolute;
      return 255 - Math.floor(4.25 * delta);
    } else if (hueAbsolute > 120 && hueAbsolute < 241) {
      return 0;
    } else if (hueAbsolute > 240 && hueAbsolute < 301) {
      const delta = 300 - hueAbsolute;
      return Math.floor(4.25 * delta);
    }
    return 255;
  }

  // This function calculates for Green channel & gives result in terms of hue
  function changeGreen(hue) {
    const hueAbsolute = hue * 360;
    if (hueAbsolute > 0 && hueAbsolute < 61) {
      const delta = 60 - hueAbsolute;
      return Math.floor(4.25 * delta);
    } else if (hueAbsolute > 180 && hueAbsolute < 241) {
      const delta = 240 - hueAbsolute;
      return 255 - Math.floor(4.25 * delta);
    } else if (hueAbsolute > 240 && hueAbsolute < 361) {
      return 0;
    }
    return 255;
  }
};
