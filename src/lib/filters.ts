export const applyFilter = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  filter: string
) => {
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;

  switch (filter) {
    case "grayscale":
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // R
        data[i + 1] = avg; // G
        data[i + 2] = avg; // B
      }
      break;

    case "sepia":
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
      }
      break;

    case "invert":
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i]; // R
        data[i + 1] = 255 - data[i + 1]; // G
        data[i + 2] = 255 - data[i + 2]; // B
      }
      break;
  }

  context.putImageData(imageData, 0, 0);
};
