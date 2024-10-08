import { Language } from './models';

export const TOTAL_POSSIBLE_IMAGES_AMOUNT = 10000;
export const IMAGES_PER_PAGE = 30;
export const ADDITIONAL_IMAGES_AMOUNT = 8;
export const BACKGROUND_IMG_SOURCE = `https://api.unsplash.com//search/photos?client_id=${import.meta.env.VITE_UNSPLASH_KEY}&query=nature&orientation=landscape`;

export const IMAGE_MIN_CROP =
  '?crop=entropy&cs=tinysrgb&fit=crop&h=200&q=80&utm_campaign=api-credit&w=400';

export const IMAGE_FULL_HD =
  '?crop=entropy&cs=tinysrgb&fit=crop&h=1080&q=80&utm_campaign=api-credit&w=1920';

export const minColorHue = 100;

export const PRELOADED_IMAGES = [
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?crop=entropy&w=1920',
  'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?crop=entropy&w=1920',
  'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?crop=entropy&cs=tinysrgb&fit=crop&h=1080&q=80&utm_campaign=api-credit&w=1920',
  'https://images.unsplash.com/photo-1504198266287-1659872e6590?crop=entropy&w=1920',
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?crop=entropy&w=1920',
  'https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?crop=entropy&w=1920',
  'https://images.unsplash.com/photo-1458929526027-052f5d6a3c5e?crop=entropy&w=1920',
  'https://images.unsplash.com/photo-1448518340475-e3c680e9b4be?crop=entropy&w=1920',
];

export const validateOptions = {
  name: { required: true, maxLength: 32 },
  email: { required: true },
  password: {
    required: true,
    minLength: 6,
    maxLength: 32,
  },
  title: { required: true },
  description: { required: true },
};

export const defaultLang: Language = 'en';
