import { Translation } from "../types";

export const mainPage = (): Translation['mainPage'] => ({
  boards: 'Доски',
  promotion:
    'Вы можете просматривать, изменять и удалять их. Не нашли свою? Создайте новую!',
  boardsNumber: 'Количество доступных досок:',
  createBoard: 'создать доску',
  boardsUnavailable: 'Невозможно отобразить доски :(',
});
