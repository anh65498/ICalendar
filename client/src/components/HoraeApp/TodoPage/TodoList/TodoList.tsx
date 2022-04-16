import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from 'context/GlobalContext';
import { Task } from 'context/controllers/taskReducer';
import { DropResult } from 'react-beautiful-dnd';
import { EditTaskPayload } from 'context/controllers/taskReducer';
import { EditTaskListPayload } from 'context/controllers/taskListReducer';

import Text from 'components/Common/Text';
import EditTodoListMenu from 'components/HoraeApp/TodoPage/TodoList/EditTodoListMenu';
import Icon from 'components/Common/Icon';
import TodoItem from 'components/HoraeApp/TodoPage/TodoItem/TodoItem';
import TodoInput from 'components/HoraeApp/TodoPage/TodoInput/TodoInput';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

interface ITodoProps {
  id: string;
  title: string;
  settings: {
    color: string;
  };
  tasks: Task[];
}

const StyledTodoList = styled.div`
  display: flex;
  margin: var(--spacing-base);
  flex-direction: column;
  border-radius: 1rem;
  max-width: 36rem;
  box-shadow: 0px 2px 16px 0px rgba(219, 219, 219, 0.5);
  max-height: 75rem;
`;

const StyledTodoListBody = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div<{ color: string }>`
  display: grid;
  grid-template-columns: 1fr 3rem;
  background-color: var(${(props) => props.color});
  padding: var(--spacing-small);
  text-align: center;
  align-items: center;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  position: relative;
`;

function TodoList({ id, title, tasks, settings }: ITodoProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const { data, dispatch } = useContext(GlobalContext);
  const uid = data.id;

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const addTask = (taskName: string, deadline?: Date) => {
    fetch('/api/todolist/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
        todoListId: id,
        name: taskName,
        deadline: deadline?.toString() || '',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const taskId = data.id;
        dispatch({
          type: 'ADD_TASK',
          payload: {
            taskListId: id,
            taskId: taskId,
            task: {
              name: taskName,
              deadline: deadline?.toString() || '',
              completed: false,
            },
          },
        });
      });
  };

  const removeTask = (taskId: string) => {
    fetch(`/api/todolist/task/${uid}/${id}/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'REMOVE_TASK',
          payload: {
            taskId: taskId,
            taskListId: id,
          },
        });
      });
  };

  const editTask = (taskId: string, updates: EditTaskPayload) => {
    console.log(updates);
    fetch(`/api/todolist/task/${uid}/${id}/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'EDIT_TASK',
          payload: {
            taskId: taskId,
            taskListId: id,
            task: updates,
          },
        });
      });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const editTaskList = (updates: EditTaskListPayload) => {
    dispatch({
      type: 'EDIT_TASK_LIST',
      payload: { taskListId: id, updates: updates },
    });
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newState = [...taskList];
    const a = newState.splice(source.index, 1);
    newState.splice(destination.index, 0, ...a);
    setTaskList(newState);
    editTaskList({ tasks: newState });
  };

  const closeMenu = () => {
    setIsEditing(false);
  };

  return (
    <StyledTodoList>
      <Header color={settings.color}>
        <Text type="large" color="white" weight="500">
          {title}
        </Text>
        <div>
          <Icon
            type="kebab"
            white={false}
            height={20}
            onClick={toggleEditMode}
          />
          {isEditing && (
            <EditTodoListMenu
              closeMenu={closeMenu}
              listId={id}
              currentColor={settings.color}
              title={title}
            />
          )}
        </div>
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={id}>
          {(provided) => (
            <StyledTodoListBody
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {taskList &&
                taskList.map((task, index) => (
                  <TodoItem
                    key={task.id}
                    {...task}
                    removeTask={removeTask}
                    editTask={editTask}
                    index={index}
                  />
                ))}
              {provided.placeholder}
            </StyledTodoListBody>
          )}
        </Droppable>
      </DragDropContext>
      <TodoInput createNewTodo={addTask} />
    </StyledTodoList>
  );
}

export default TodoList;
