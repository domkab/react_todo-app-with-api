import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import {
  setFilter,
} from './redux/todoSlice';
import { selectFilteredTodos } from './redux/selectors';
import { fetchTodos } from './redux/todoThunks';
import { USER_ID } from './_utils/constants';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { UserWarning } from './components/UserWarning/UserWarning';
import { TodoFilter } from './types/TodoFilter';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const todos = useSelector(
    (state: RootState) => state.todos.todos,
  );

  useEffect(() => {
    dispatch(fetchTodos(USER_ID));
  }, [dispatch]);

  const filteredTodos = useSelector(selectFilteredTodos);

  const handleFilterChange = (filter: TodoFilter) => {
    dispatch(setFilter(filter));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <TodoHeader />

        <TodoList todos={filteredTodos} />

        {!!todos?.length && (
          <TodoFooter
            todos={filteredTodos}
            filterChange={handleFilterChange}
          />
        )}
      </div>

      <ErrorNotification />
    </div>
  );
};