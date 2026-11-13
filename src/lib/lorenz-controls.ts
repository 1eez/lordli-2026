import { createLorenzPath, defaultParameters } from './lorenz.mjs';

const controls = document.querySelector<HTMLFormElement>('.lorenz-controls');
if (controls) {
  const visual = document.querySelector('.hero-visual')!;
  const path = visual.querySelector<SVGPathElement>('.lorenz-trajectory')!;
  const coordinate = visual.querySelector<HTMLElement>('.art-coordinate')!;
  const description = visual.querySelector('#lorenz-desc')!;
  const marker = visual.querySelector<SVGCircleElement>('.lorenz-equilibrium')!;
  const status = controls.querySelector<HTMLElement>('.lorenz-status')!;
  const sliders = [...controls.querySelectorAll<HTMLInputElement>('input[type="range"]')];
  const parameters = { ...defaultParameters };
  let timer: ReturnType<typeof setTimeout> | undefined;
  const format = (value: number) => String(Number(value.toFixed(2)));
  const betaLabel = () => parameters.beta === defaultParameters.beta ? '8/3' : format(parameters.beta);
  const english = () => document.documentElement.lang === 'en';
  function setStatus(zh: string, en: string) {
    status.dataset.zh = zh;
    status.dataset.en = en;
    status.textContent = english() ? en : zh;
  }
  function updateLabels() {
    for (const slider of sliders) {
      const key = slider.name as keyof typeof parameters;
      const label = key === 'beta' ? betaLabel() : format(parameters[key]);
      controls!.querySelector<HTMLOutputElement>(`output[for="${slider.id}"]`)!.value = label;
      slider.setAttribute('aria-valuetext', label);
    }
    coordinate.textContent = `σ = ${format(parameters.sigma)} · ρ = ${format(parameters.rho)} · β = ${betaLabel()}`;
  }
  function redraw() {
    const result = createLorenzPath(parameters);
    if (!result) {
      setStatus('轨迹超出范围，请调整参数或重置。', 'Trajectory out of range. Try resetting.');
      path.style.visibility = 'hidden';
      marker.style.display = 'none';
      return;
    }
    path.style.animation = 'none';
    path.style.visibility = '';
    path.setAttribute('d', result.path);
    marker.style.display = result.stationary ? '' : 'none';
    description.textContent = `Lorenz trajectory: sigma=${parameters.sigma}, rho=${parameters.rho}, beta=${parameters.beta}.`;
    if (result.stationary) setStatus('当前轨迹接近稳定点。', 'Trajectory approaches a steady point.');
    else setStatus('拖动参数，观察轨迹如何变化。', 'Drag a parameter to explore the trajectory.');
  }
  for (const slider of sliders) {
    slider.addEventListener('input', () => {
      parameters[slider.name as keyof typeof parameters] = Number(slider.value);
      updateLabels();
      if (timer === undefined) {
        timer = setTimeout(() => { timer = undefined; redraw(); }, 40);
      }
    });
    slider.addEventListener('change', () => { clearTimeout(timer); timer = undefined; redraw(); });
  }
  controls.addEventListener('reset', event => {
    event.preventDefault();
    clearTimeout(timer);
    timer = undefined;
    Object.assign(parameters, defaultParameters);
    for (const slider of sliders) slider.value = String(parameters[slider.name as keyof typeof parameters]);
    updateLabels();
    redraw();
  });
  controls.hidden = false;
  updateLabels();
}
