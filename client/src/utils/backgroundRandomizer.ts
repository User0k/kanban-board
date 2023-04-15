import { BACKGROUND_IMG_SOURCE } from '../constants';

const randomSig = () => Math.floor(Math.random() * 1000000);

export async function getAllSources(n: number) {
  const urls: string[] = [];
  for (let i = 0; i < n; i++) {
    const sig = randomSig();
    const { url } = await fetch(`${BACKGROUND_IMG_SOURCE}&sig=${sig}`);
    urls.push(`url(${url})`);
  }

  return urls;
}
