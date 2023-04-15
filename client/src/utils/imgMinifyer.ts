import { IMAGE_MIN_CROP } from '../constants';

export default function imgMinifyer(images: string[]) {
  return images.map((image) => {
    const params = image.split('?');
    return params[0] + IMAGE_MIN_CROP;
  });
}
