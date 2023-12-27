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
  ColumnId: string;
  description?: string;
  order?: number;
}

export interface IUpdateTask
  extends IGetTask,
    Pick<ITask, 'title' | 'description'> {}

export type NewTask = Omit<IUpdateTask, 'id'>;

export interface IReorderTask extends IGetTask {
  targetColumnId?: string;
  targetOrder: number;
}

export interface IGroupedTasks {
  [columnId: string]: ITask[];
}

export interface IUserFields {
  email: string;
  password: string;
  name: string;
}

export type LoginFields = Omit<IUserFields, 'name'>;

export interface IUser extends IUserFields {
  id: string;
  refreshToken: string | null;
  color: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export type AssignedUser = Pick<IUser, 'id' | 'color' | 'name'>;

export interface IUsersInTasks {
  [taskId: string]: AssignedUser[] | undefined;
}

export interface IServerMessage {
  message: string;
}

export type Language = 'en' | 'ru';
