import React, { useState } from 'react';
import styled from 'styled-components';
import { addHours, isValid } from 'date-fns';

const StyledInputContainer = styled.div`
  padding: var(--spacing-base);
  display: grid;
  grid-template-columns: 4fr 2fr;
  grid-column-gap: 1rem;
  box-shadow: 0px 0px 16px 0px rgba(219, 219, 219, 0.4);
  border-top: 1px solid var(--color-shadow);
`;

const StyledInput = styled.input`
  border: none;
  font-size: 1.75rem;
  outline: none;
  font-family: var(--font-regular);
  border-bottom: 1px solid var(--color-nav-item-text);
  width: 100%;
  color: var(--color-text-subtitle);
`;

const StyledDeadline = styled.input`
  background: transparent;
  font-size: 1rem;
  border: none;
  outline: none;
  border-bottom: 1px solid var(--color-nav-item-text);
  font-family: var(--font-regular);
`;

function isValidDate(d: any) {
  return !isNaN(d) && d instanceof Date;
}

interface ITodoInputProps {
  createNewTodo: (todoName: string, deadline?: Date) => void;
}

function TodoInput({ createNewTodo }: ITodoInputProps) {
  const [newTodoName, setNewTodoName] = useState<string>('');
  const [newDeadline, setNewDeadline] = useState<string>('');

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const todoName = event.currentTarget.value;
    setNewTodoName(todoName);
  };

  const handleDeadline = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const deadline = event.currentTarget.value;
    setNewDeadline(deadline);
  };

  const createTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13 && newTodoName) {
      const utcDate = new Date(newDeadline);
      const currentDateString = addHours(
        utcDate,
        utcDate.getTimezoneOffset() / 60
      );
      const dateStr = new Date(currentDateString);
      createNewTodo(newTodoName, isValid(dateStr) ? dateStr : undefined);
      setNewTodoName('');
      setNewDeadline('');
    }
  };

  return (
    <StyledInputContainer>
      <StyledInput
        type="text"
        onChange={handleChange}
        value={newTodoName}
        placeholder="Add a new Task"
        onKeyPress={createTodo}
      />
      <StyledDeadline
        type="date"
        placeholder="Deadline"
        onKeyPress={createTodo}
        onChange={handleDeadline}
        value={newDeadline}
      />
    </StyledInputContainer>
  );
}

export default TodoInput;
