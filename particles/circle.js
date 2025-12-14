export const circlePositions = (() => {
  const points = [];

  for (let i = 0; i < 1000; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 1.5;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = (Math.random() - 0.5) * 0.5;

    points.push(x, y, z);
  }

  return points;
})();
