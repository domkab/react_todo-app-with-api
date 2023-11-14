import { Todo } from '../types/Todo';
import { client } from '../_utils/fetchClient';
import { USER_ID } from '../_utils/constants';

export interface AddTodoResponse {
  data: Todo;
}

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodoApi = async (
  title: string,
): Promise<AddTodoResponse> => {
  const response = await client.post(
    '/todos', { userId: USER_ID, title, completed: false },
  );

  return { data: response as Todo };
};

export const renameTodoApi = async (
  todoId: number,
  newName: string,
): Promise<Todo> => {
  const response = await client.patch<Todo>(`/todos/${todoId}`, { title: newName });

  return response;
};

export const removeTodoApi = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const deleteCompletedTodosForUser = (userId: number): Promise<void> => {
  return getTodos(userId).then(todos => {
    const completedTodos = todos.filter(todo => todo.completed);

    return Promise.all(completedTodos.map(todo => removeTodoApi(todo.id)));
  }).then(() => { });
};

export const setTodoCompletionApi = async (
  todoId: number,
  completed: boolean,
): Promise<Todo> => {
  const response = await client.patch<Todo>(
    `/todos/${todoId}`,
    { completed },
  );

  return response;
};

export const completeAllTodosApi = (todos: Todo[]): Promise<Todo[]> => {
  const updatePromises = todos.map(todo => setTodoCompletionApi(todo.id, true));

  return Promise.all(updatePromises);
};
