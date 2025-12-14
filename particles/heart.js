export const heartPositions = (() => {
  const points = [];

  for (let i = 0; i < 1000; i++) {
    const t = Math.random() * Math.PI * 2;

    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    const z = (Math.random() - 0.5) * 2;

    points.push(x * 0.04, y * 0.04, z);
  }

  return points;
})();
