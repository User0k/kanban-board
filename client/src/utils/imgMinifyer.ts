import { IMAGE_MIN_CROP } from '../constants';

export default function imgMinifyer(images: string[], urlInclude = true) {
  return images.map((image) => {
    const params = image.split('?');
    return urlInclude
      ? `url(${params[0]}${IMAGE_MIN_CROP})`
      : params[0] + IMAGE_MIN_CROP;
  });
}
