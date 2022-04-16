import React, { useContext, useState } from 'react';
import GlobalContext from 'context/GlobalContext';
import styled from 'styled-components';

import Text from 'components/Common/Text';
import TodoList from 'components/HoraeApp/TodoPage/TodoList/TodoList';
import TodoModal from 'components/HoraeApp/TodoPage/TodoModal';

const TodoPageBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const StyledTodoListsButton = styled.button`
  min-width: 7rem;
  min-height: 7rem;
  max-height: 7rem;
  max-width: 7rem;
  background-color: var(--color-primary);
  position: fixed;
  z-index: 0;
  bottom: 5rem;
  right: 5rem;
  border-radius: 50%;
  outline: none;
  color: white;
  box-shadow: 0 0 20px var(--color-text-subtitle);
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-6px);
  }
`;

function TodoPage() {
  const { data } = useContext(GlobalContext);
  const taskLists = data.todo_lists;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpenMode = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Text type="heading1" styleProp="text-align: center;">
        Todo Lists
      </Text>
      <TodoPageBody>
        {taskLists &&
          taskLists.map((taskList) => (
            <TodoList key={taskList.id} {...taskList} />
          ))}
      </TodoPageBody>
      <StyledTodoListsButton onClick={toggleOpenMode}>
        <Text type="heading1" weight="300" color="white">
          +
        </Text>
      </StyledTodoListsButton>
      {isOpen && (
        <ModalBackground onClick={closeModal}>
          <TodoModal closeModal={closeModal} />
        </ModalBackground>
      )}
    </>
  );
}

export default TodoPage;
