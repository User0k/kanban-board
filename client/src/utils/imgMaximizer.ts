import { IMAGE_FULL_HD } from '../constants';

export function imgMaximizer(image: string) {
  return image[0] === 'u' ? image.split('?')[0] + IMAGE_FULL_HD + ')' : image;
}
