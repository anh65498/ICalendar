import React, { useContext, useState } from 'react';
import GlobalContext from 'context/GlobalContext';
import styled from 'styled-components';

import Text from 'components/Common/Text';

const COLORS = [
  '--color-primary-1',
  '--color-primary-2',
  '--color-primary-3',
  '--color-primary-4',
  '--color-primary-5',
  '--color-primary-6',
  '--color-primary-7',
  '--color-primary',
];

interface ITodoModalProps {
  closeModal: () => void;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  min-width: 35rem;
  max-width: 35rem;
  border-radius: 1rem;
  margin: var(--spacing-small);
  padding: 0 var(--spacing-base) var(--spacing-base);
  cursor: default;
  box-sizing: border-box;
`;

const FormHeader = styled.div`
  padding: var(--spacing-base);
`;

const StyledTodoListNameInput = styled.input<{ todoListColor: string }>`
  border: none;
  border-bottom: 3px solid var(--color-shadow);
  border-bottom-color: var(${(props) => props.todoListColor});
  outline: none;
  width: 100%;
  font: var(--font-large);
  color: var(--color-text-body);
  &::placeholder {
    color: var(--color-text-subtitle);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const SubmitButton = styled.button<{ secondary?: boolean }>`
  cursor: pointer;
  outline: none;
  border: 0;
  padding: var(--spacing-tiny) var(--spacing-base);
  border-radius: 1rem;
  background-color: var(--color-primary);
  flex: 1 1 0px;
  margin: var(--spacing-tiny);
  text-align: center;
  ${(props) =>
    props.secondary &&
    `
  background-color: var(--color-shadow);
  span {
    color: var(--color-text-body) !important;
  }
  `}
`;

const ColorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: var(--spacing-base);
`;

const ColorOption = styled.div<{ color: string; selected?: boolean }>`
  min-width: 4rem;
  max-width: 4rem;
  min-height: 4rem;
  max-height: 4rem;
  border-radius: 50%;
  margin: var(--spacing-tiny);
  cursor: pointer;
  background-color: var(--color-primary);
  background-color: var(${(props) => props.color});
  transition: all 0.2s;
  border: 3px solid transparent;
  ${(props) => props.selected && 'border-color: var(--color-text-body);'}
  &:hover {
    transform: translateY(-3px);
  }
`;

function TodoModal({ closeModal }: ITodoModalProps) {
  const { data, dispatch } = useContext(GlobalContext);
  const uid = data.id;
  const [todoListName, setTodoListName] = useState<string>('');
  const [todoListColor, setTodoListColor] = useState<string>(
    '--color-primary-3'
  );

  const addTaskList = (listTitle: string, color: string) => {
    fetch('/api/todolist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
        title: listTitle,
        color: color,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'ADD_TASK_LIST',
          payload: {
            id: data.id,
            taskList: {
              title: listTitle,
              tasks: [],
              settings: {
                color: color,
              },
            },
          },
        });
      });
  };

  const handleChangeName = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setTodoListName(event.currentTarget.value);
  };

  const saveForm = () => {
    if (todoListName !== '') {
      addTaskList(todoListName, todoListColor);
      closeModal();
    }
  };

  return (
    <StyledForm
      onSubmit={(event) => {
        event.preventDefault();
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <FormHeader>
        <Text type="heading3">Create a New List</Text>
      </FormHeader>
      <div>
        <StyledTodoListNameInput
          type="text"
          placeholder="New todo list name"
          value={todoListName}
          onChange={handleChangeName}
          required={true}
          todoListColor={todoListColor}
        />
      </div>
      <ColorContainer>
        {COLORS.map((color) => (
          <ColorOption
            key={color}
            color={color}
            onClick={() => setTodoListColor(color)}
            selected={todoListColor === color}
          />
        ))}
      </ColorContainer>
      <ButtonContainer>
        <SubmitButton onClick={saveForm}>
          <Text type="small" color="white">
            Add
          </Text>
        </SubmitButton>
        <SubmitButton onClick={closeModal} secondary>
          <Text type="small" color="white">
            Cancel
          </Text>
        </SubmitButton>
      </ButtonContainer>
    </StyledForm>
  );
}

export default TodoModal;
