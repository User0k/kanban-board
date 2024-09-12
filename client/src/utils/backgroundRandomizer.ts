import {
  TOTAL_POSSIBLE_IMAGES_AMOUNT,
  IMAGES_PER_PAGE,
  BACKGROUND_IMG_SOURCE,
} from '../constants';

interface IResponse extends Omit<Response, 'url'> {
  results: {
    id: string;
    urls: {
      full: string;
      regular: string;
    };
  }[];
}

export async function fetchRandomImagesPage() {
  const totalPages = Math.floor(TOTAL_POSSIBLE_IMAGES_AMOUNT / IMAGES_PER_PAGE);
  const currentPage = Math.floor(Math.random() * totalPages) + 1;
  const resp = await fetch(
    `${BACKGROUND_IMG_SOURCE}&per_page=${IMAGES_PER_PAGE}&page=${currentPage}`,
  );
  const data: IResponse = await resp.json();
  return data?.results.map((item) => item.urls.regular);
}
