import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Text from 'components/Common/Text';
import Icon from 'components/Common/Icon';
import { EditTaskPayload } from 'context/controllers/taskReducer';
import { addHours } from 'date-fns';

import { Draggable } from 'react-beautiful-dnd';

const isValidDate = (d: any) => {
  return !isNaN(d.getTime());
};

interface ITodoItemProps {
  id: string;
  name: string;
  deadline?: string;
  completed: boolean;
  removeTask: (id: string) => void;
  editTask: (taskId: string, updates: EditTaskPayload) => void;
  index: number;
}

const StyledTodoItemBox = styled.div<{ completed: boolean }>`
  margin: var(--spacing-small);
  padding: var(--spacing-small);
  border-radius: 1rem;
  box-shadow: 0px 0px 10px var(--color-shadow);
  cursor: pointer;
  display: grid;
  grid-template-columns: 3rem 1fr 8rem;
  align-items: center;
  grid-column-gap: var(--spacing-tiny);
  transition: background-color 0.4s;
  position: relative;
  background-color: white;
  ${(props) =>
    props.completed &&
    `background-color: var(--color-light-gray);
         box-shadow: 0px 0px 0px;`}
  &:hover {
    .icon-container {
      background-image: linear-gradient(
        to left,
        ${(props) =>
          props.completed
            ? 'var(--color-light-gray) 70%, rgba(243,243,243,0.5)'
            : 'white 70%, rgba(255,255,255,0.5)'}
      );
      visibility: visible;
      opacity: 1;
    }
  }
`;

const StyledCompleteButton = styled.div<{ completed: boolean }>`
  min-width: 2.25rem;
  max-width: 2.25rem;
  min-height: 2.25rem;
  max-height: 2.25rem;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid var(--color-nav-item-text);
  transition: border 0.2s;
  box-sizing: border-box;
  ${(props) =>
    !props.completed &&
    `&:hover {
      border: 3px solid var(--color-primary-2);
    }`}
  ${(props) =>
    props.completed &&
    `background-color:#c1bfbf;
   border: none;
   transition: 0.4s;`}
`;
const StyledCheckmark = styled.svg<{ completed: boolean }>`
  fill: none;
  ${(props) =>
    props.completed &&
    `stroke: white; 
    stroke-width: 2px;
    transition: 0.4s;`}
`;

const StyledInput = styled.input<{ completed: boolean }>`
  border: none;
  font-size: 1.75rem;
  outline: none;
  font-family: var(--font-regular);
  border-bottom: 2px solid var(--color-primary);
  width: 100%;
  color: var(--color-text-subtitle);
  ${(props) =>
    props.completed &&
    `background-color: transparent;
    color: var(--color-text-subtitle);`}
`;

const StyledDeadline = styled.input<{ completed: boolean }>`
  border: none;
  font-size: 1rem;
  outline: none;
  font-family: var(--font-small);
  border-bottom: 2px solid var(--color-primary);
  width: 100%;
  color: var(--color-text-subtitle);
  padding-bottom: 11px;
  ${(props) => props.completed && `background-color: transparent`}
`;

const IconContainer = styled.div`
  visibility: hidden;
  display: flex;
  opacity: 0;
  transition: opacity 0.2s;
  justify-content: space-between;
  position: absolute;
  right: 0;
  min-width: 5rem;
  padding: var(--spacing-small);
`;

function TodoItem({
  id,
  name,
  deadline = '',
  completed,
  removeTask,
  editTask,
  index,
}: ITodoItemProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(name);
  const [editedDeadline, setEditedDeadline] = useState<string>(deadline);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleRemoveTask = () => {
    removeTask(id);
  };

  const handleEditName = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setEditedName(event.currentTarget.value);
  };

  const submitEdits = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      setIsEditing(false);
      if (editedName === '') {
        setEditedName(name);
      } else {
        const utcDate = new Date(editedDeadline);
        const currentDateString = addHours(
          utcDate,
          utcDate.getTimezoneOffset() / 60
        );
        editTask(id, {
          name: editedName,
          deadline: currentDateString.toString(),
        });
      }
    }
  };

  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const clickedOnInput = event?.relatedTarget instanceof HTMLInputElement;
    if (clickedOnInput) {
      return;
    }
    if (editedName === '') {
      setEditedName(name);
    } else if (editedDeadline === '') {
      setEditedDeadline(deadline);
    } else if (editedName !== name && editedDeadline !== deadline) {
      const utcDate = new Date(editedDeadline);
      const currentDateString = addHours(
        utcDate,
        utcDate.getTimezoneOffset() / 60
      );
      editTask(id, {
        name: editedName,
        deadline: currentDateString.toLocaleString(),
      });
    } else if (editedDeadline !== deadline) {
      const utcDate = new Date(editedDeadline);
      const currentDateString = addHours(
        utcDate,
        utcDate.getTimezoneOffset() / 60
      );
      editTask(id, { deadline: currentDateString.toLocaleString() });
    } else if (editedName !== name) {
      editTask(id, { name: editedName });
    }
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleCompleted = () => {
    editTask(id, {
      completed: !completed,
    });
  };

  const handleDeadlineName = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setEditedDeadline(event.currentTarget.value);
  };

  const localDate = new Date(deadline);

  const localDateText = localDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const deadlineText = isValidDate(localDate) ? localDateText : '';

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <StyledTodoItemBox
          completed={completed}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <StyledCompleteButton completed={completed} onClick={handleCompleted}>
            <StyledCheckmark viewBox="0 0 24 24" completed={completed}>
              <polyline points="20 6 9 17 4 12" />
            </StyledCheckmark>
          </StyledCompleteButton>
          {isEditing ? (
            <StyledInput
              type="text"
              onChange={handleEditName}
              value={editedName}
              onKeyPress={submitEdits}
              onBlur={onBlurHandler}
              ref={inputRef}
              completed={completed}
            />
          ) : (
            <Text
              type="small"
              color={completed ? 'var(--color-text-subtitle);' : ''}
              styleProp={completed ? 'text-decoration: line-through;' : ''}
            >
              {name}
            </Text>
          )}
          {isEditing ? (
            <StyledDeadline
              type="date"
              onChange={handleDeadlineName}
              value={editedDeadline}
              onKeyPress={submitEdits}
              onBlur={onBlurHandler}
              completed={completed}
            />
          ) : (
            <Text type="tiny">{deadlineText}</Text>
          )}

          <IconContainer className={isEditing ? '' : 'icon-container'}>
            <span onClick={handleRemoveTask}>
              <Icon type="trash" white={false} height={20} />
            </span>
            <span onClick={toggleEditMode}>
              <Icon type="edit" white={false} height={20} />
            </span>
          </IconContainer>
        </StyledTodoItemBox>
      )}
    </Draggable>
  );
}

export default TodoItem;
