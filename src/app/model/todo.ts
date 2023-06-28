export interface ITodo {
  id: string;
  title: string;
  isDone: boolean;
}

export interface ITodoInput extends Omit<ITodo, 'id'> {}
