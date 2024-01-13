import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

// @ts-ignore
import { kernelFunction } from "./kernel";

const GPU = (window as any).GPU;

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hue, setHue] = useState(0.5);
  const gpu = useMemo(() => new GPU(), []);

  useEffect(() => {
    if (canvasRef.current === null) {
      return;
    }

    const kernel = gpu
      .createKernel(kernelFunction)
      .setOutput([canvasRef.current.width * canvasRef.current.height * 4]);

    const ctx = canvasRef.current.getContext("2d");
    const output = kernel(canvasRef.current.width, canvasRef.current.height, hue) as any[];

    const data = Uint8ClampedArray.from(output);

    const imageData = new ImageData(
      data,
      canvasRef.current.width,
      canvasRef.current.height
    );

    ctx?.putImageData(imageData, 0, 0);
  }, [hue, canvasRef, gpu]);

  const updateHue = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setHue(parseFloat(ev.target.value));
  }, [setHue]);

  return (
    <div className="container">
      <div>
        <canvas width={500} height={500} ref={canvasRef} />
      </div>
      <div>
        <input type="range" step={0.01} min={0} max={1} onChange={updateHue} value={hue} />
      </div>
    </div>
  );
}

export default App;
