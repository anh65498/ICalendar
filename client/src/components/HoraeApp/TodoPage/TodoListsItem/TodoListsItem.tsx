import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface ITodoListsItemProps {
  id: string;
  title: string;
  color?: string;
}

const StyledTodoListsItemBox = styled.div`
  margin: var(--spacing-small);
  padding: var(--spacing-small);
  border-radius: 1rem;
  box-shadow: 0px 0px 10px var(--color-shadow);
  display: grid;
  grid-template-columns: 3rem 1fr 6rem;
  align-items: center;
  grid-column-gap: var(--spacing-tiny);
`;

function TodoListsItem({
  id,
  title,
  color = 'blue',
}: ITodoListsItemProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);  

  const toggleOpenMode = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledTodoListsItemBox>
        <button onClick={toggleOpenMode} > Add list </button>
    </StyledTodoListsItemBox>
  );
}

export default TodoListsItem;
