export const defaultParameters = { sigma: 10, rho: 28, beta: 8 / 3 };

export function createLorenzPath({ sigma, rho, beta } = defaultParameters) {
  const dt = 0.005;
  const derivative = ([x, y, z]) => [sigma * (y - x), x * (rho - z) - y, x * y - beta * z];
  const add = (a, b, scale) => a.map((value, i) => value + b[i] * scale);
  let point = [0.1, 0, 0];
  const points = [];
  for (let i = 0; i < 7000; i++) {
    const a = derivative(point);
    const b = derivative(add(point, a, dt / 2));
    const c = derivative(add(point, b, dt / 2));
    const d = derivative(add(point, c, dt));
    point = point.map((value, axis) => value + dt * (a[axis] + 2 * b[axis] + 2 * c[axis] + d[axis]) / 6);
    if (!point.every(value => Number.isFinite(value) && Math.abs(value) < 10000)) {
      return null;
    }
    if (i >= 4000) {
      const [x, y, z] = point;
      points.push([x + 0.15 * y, -z + 0.18 * y]);
    }
  }
  const minX = Math.min(...points.map(p => p[0])), maxX = Math.max(...points.map(p => p[0]));
  const minY = Math.min(...points.map(p => p[1])), maxY = Math.max(...points.map(p => p[1]));
  const stationary = Math.max(maxX - minX, maxY - minY) < 0.2;
  // Do not magnify numerical noise into a full-size shape near equilibrium.
  const scale = Math.min(460 / Math.max(maxX - minX, 1), 420 / Math.max(maxY - minY, 1), 160);
  const path = points.map(([x, y], i) => {
    const px = 300 + (x - (maxX + minX) / 2) * scale;
    const py = 283 + (y - (maxY + minY) / 2) * scale;
    return `${i ? 'L' : 'M'}${px.toFixed(2)},${py.toFixed(2)}`;
  }).join(' ');
  return { path, stationary };
}
