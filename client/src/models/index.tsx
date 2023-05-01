export interface IBoard {
  id: string;
  name: string;
  description: string;
  image: string;
}

export type NewBoard = Omit<IBoard, 'id'>;

export interface IColumn {
  id: string;
  boardId: string;
  title: string;
  order?: number;
}

export type GetColumn = Pick<IColumn, 'boardId' | 'id'>;
export type NewColumn = Pick<IColumn, 'boardId' | 'title'>;

export interface IReorderColumn extends GetColumn {
  targetOrder: number;
}

export interface IGetTask {
  id: string;
  boardId: string;
  columnId: string;
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  order?: number;
}

export interface IUpdateTask
  extends IGetTask,
    Pick<ITask, 'title' | 'description'> {}

export type NewTask = Omit<IUpdateTask, 'id'>;

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
}
