import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectFilter } from '../../redux/selectors';
import { Todo } from '../../types/Todo';
import { TodoFilter } from '../../types/TodoFilter';

interface TodoFooterProps {
  todos: Todo[];
  filterChange: (filter: TodoFilter) => void;
}

export const TodoFooter: React.FC<TodoFooterProps> = (
  { todos, filterChange },
) => {
  const currentFilter = useSelector(selectFilter);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link',
            {
              selected: currentFilter === TodoFilter.All,
            })}
          data-cy="FilterLinkAll"
          onClick={() => filterChange(TodoFilter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link',
            {
              selected: currentFilter === TodoFilter.Active,
            })}
          data-cy="FilterLinkActive"
          onClick={() => filterChange(TodoFilter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link',
            {
              selected: currentFilter === TodoFilter.Completed,
            })}
          data-cy="FilterLinkCompleted"
          onClick={() => filterChange(TodoFilter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>

    </footer>
  );
};
