export interface IBoard {
  id: string;
  name: string;
  description: string;
}

export type NewBoard = Omit<IBoard, 'id'>;

export interface IColumn {
  id: string;
  title: string;
  order?: number;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  order?: number;
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
}
