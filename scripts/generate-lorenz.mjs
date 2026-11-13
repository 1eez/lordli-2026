import { writeFileSync } from 'node:fs';

// Classical Lorenz system, RK4 integration. This generates the static artwork;
// the browser only reveals the precomputed path, without running a simulation.
const sigma = 10;
const rho = 28;
const beta = 8 / 3;
const dt = 0.005;
const derivative = ([x, y, z]) => [sigma * (y - x), x * (rho - z) - y, x * y - beta * z];
const add = (a, b, scale) => a.map((value, i) => value + b[i] * scale);
function step(point) {
  const a = derivative(point);
  const b = derivative(add(point, a, dt / 2));
  const c = derivative(add(point, b, dt / 2));
  const d = derivative(add(point, c, dt));
  return point.map((value, i) => value + dt * (a[i] + 2 * b[i] + 2 * c[i] + d[i]) / 6);
}

let point = [0.1, 0, 0];
const points = [];
for (let i = 0; i < 7000; i++) {
  point = step(point);
  if (i >= 4000) {
    const [x, y, z] = point;
    // Slightly oblique projection preserves the recognizable butterfly shape.
    points.push([x + 0.15 * y, -z + 0.18 * y, y]);
  }
}
const xs = points.map(p => p[0]);
const ys = points.map(p => p[1]);
const minX = Math.min(...xs), maxX = Math.max(...xs);
const minY = Math.min(...ys), maxY = Math.max(...ys);
const scale = Math.min(460 / (maxX - minX), 420 / (maxY - minY));
const project = ([x, y]) => [300 + (x - (maxX + minX) / 2) * scale, 283 + (y - (maxY + minY) / 2) * scale];
// Keep a short, continuous trajectory: fewer revolutions rather than dropped
// samples, so the curves stay faithful to the same differential equations.
const path = points.map((p, i) => `${i ? 'L' : 'M'}${project(p).map(n => n.toFixed(2)).join(',')}`).join(' ');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" class="sculpture lorenz-model" viewBox="0 0 600 600" role="img" aria-labelledby="lorenz-title lorenz-desc"><title id="lorenz-title">Lorenz attractor</title><desc id="lorenz-desc">A short, numerically integrated Lorenz trajectory, sigma=10, rho=28, beta=8/3.</desc><defs><radialGradient id="lorenz-shadow"><stop stop-color="#362718" stop-opacity=".12"/><stop offset="1" stop-color="#362718" stop-opacity="0"/></radialGradient><linearGradient id="lorenz-ink" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#a92d16"/><stop offset=".48" stop-color="#ec4b26"/><stop offset="1" stop-color="#f47642"/></linearGradient></defs><ellipse cx="300" cy="529" rx="192" ry="22" fill="url(#lorenz-shadow)"/><path class="lorenz-trajectory" pathLength="1" d="${path}" fill="none" stroke="url(#lorenz-ink)" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
writeFileSync(new URL('../public/media/lorenz-attractor.svg', import.meta.url), svg);
console.log(`Generated Lorenz artwork: ${points.length} samples in one continuous path.`);
