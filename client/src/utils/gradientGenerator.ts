import { minColorHue } from '../constants';

const generateChannel = () =>
  minColorHue + Math.floor(Math.random() * (256 - minColorHue));
const chooseEmptyChannel = () => Math.floor(Math.random() * 3);

function createColor() {
  const emptyChannel = chooseEmptyChannel();
  const firstChannel = generateChannel();
  const secondChannel = generateChannel();
  const color = [firstChannel, secondChannel];
  color.splice(emptyChannel, 0, 0);
  return color;
}

function generateGradient() {
  const firstColor = createColor();
  const secondColor = createColor();
  return `linear-gradient(0deg, rgba(${firstColor + ''}, 1) 0%, rgba(${
    secondColor + ''
  }, 1) 100%)`;
}

export function getGradients(n: number) {
  const gradients: string[] = [];
  for (let i = 0; i < n; i++) {
    gradients.push(generateGradient());
  }

  return gradients;
}
