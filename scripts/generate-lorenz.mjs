import { writeFileSync } from 'node:fs';

import { createLorenzPath } from '../src/lib/lorenz.mjs';

const { path } = createLorenzPath();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" class="sculpture lorenz-model" viewBox="0 0 600 600" role="img" aria-labelledby="lorenz-title lorenz-desc"><title id="lorenz-title">Lorenz attractor</title><desc id="lorenz-desc">A short, numerically integrated Lorenz trajectory, sigma=10, rho=28, beta=8/3.</desc><defs><radialGradient id="lorenz-shadow"><stop stop-color="#362718" stop-opacity=".12"/><stop offset="1" stop-color="#362718" stop-opacity="0"/></radialGradient><linearGradient id="lorenz-ink" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#a92d16"/><stop offset=".48" stop-color="#ec4b26"/><stop offset="1" stop-color="#f47642"/></linearGradient></defs><ellipse cx="300" cy="529" rx="192" ry="22" fill="url(#lorenz-shadow)"/><path class="lorenz-trajectory" pathLength="1" d="${path}" fill="none" stroke="url(#lorenz-ink)" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/><circle class="lorenz-equilibrium" cx="300" cy="283" r="4" fill="#ec4b26" style="display:none"/></svg>`;
writeFileSync(new URL('../public/media/lorenz-attractor.svg', import.meta.url), svg);
console.log('Generated default Lorenz artwork from the shared solver.');
