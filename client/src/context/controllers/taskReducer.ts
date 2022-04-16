import { GlobalState, Action } from 'context/GlobalReducer';

export type Task = {
  id: string;
  name: string;
  deadline: string;
  completed: boolean;
};

export type NewTaskPayload = Omit<Task, 'id'>;
export type EditTaskPayload = Partial<NewTaskPayload>;

export const addTask = (state: GlobalState, action: Action) => {
  if (action.type !== 'ADD_TASK') {
    return state;
  }

  const newTask = {
    id: action.payload.taskId,
    deadline: '',
    ...action.payload.task,
  };
  const newTaskList = {
    ...state.todo_lists.filter(
      (list) => list.id === action.payload.taskListId
    )[0],
  };
  newTaskList.tasks?.push(newTask);
  const newTaskLists = state.todo_lists.map((todoList) =>
    todoList.id === action.payload.taskListId ? newTaskList : todoList
  );
  console.log('Dispatch ADD_TASK');
  return { ...state, todo_lists: newTaskLists };
};

export const removeTask = (state: GlobalState, action: Action) => {
  if (action.type !== 'REMOVE_TASK') {
    return state;
  }
  const currentList = {
    ...state.todo_lists.filter(
      (list) => list.id === action.payload.taskListId
    )[0],
  };
  const newTaskList = {
    ...currentList,
    tasks: currentList.tasks.filter(
      (task) => task.id !== action.payload.taskId
    ),
  };
  const newTaskLists = state.todo_lists.map((todoList) =>
    todoList.id === action.payload.taskListId ? newTaskList : todoList
  );
  console.log('Dispatch REMOVE_TASK');
  return { ...state, todo_lists: newTaskLists };
};

export const editTask = (state: GlobalState, action: Action) => {
  if (action.type !== 'EDIT_TASK') {
    return state;
  }
  const currentList = {
    ...state.todo_lists.filter(
      (list) => list.id === action.payload.taskListId
    )[0],
  };
  const newTaskList = {
    ...currentList,
    tasks: currentList.tasks.map((task) =>
      task.id === action.payload.taskId
        ? { ...task, ...action.payload.task }
        : task
    ),
  };
  const newTaskLists = state.todo_lists.map((todoList) =>
    todoList.id === action.payload.taskListId ? newTaskList : todoList
  );
  console.log('Dispatch REMOVE_TASK');
  return { ...state, todo_lists: newTaskLists };
};
