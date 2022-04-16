import React, { useState, useContext, useRef, useEffect } from 'react';
import GlobalContext from 'context/GlobalContext';
import Text from 'components/Common/Text';
import styled from 'styled-components';

const DeleteButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-shadow);
  border-radius: 6px;
  padding: 5px 10px;
  transition: all 0.2s;
  &:hover {
    background-color: var(--color-nav-item-text);
    span {
      color: white !important;
    }
  }
`;

const SaveButton = styled.div`
  margin-bottom: var(--spacing-tiny);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  border-radius: 6px;
  padding: 5px 10px;
  transition: all 0.2s;
  &:hover {
    background-color: var(--color-primary);
    span {
      color: white !important;
    }
  }
`;

const ColorPickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: var(--spacing-small) 0;
  cursor: pointer;
`;

const BackgroundOverlay = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

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

const ColorPickerOption = styled.div<{ color: string; selected: boolean }>`
  background-color: var(${(props) => props.color});
  transition: border 0.2s;
  ${(props) => props.selected && `border: 2px solid #333;`}
  box-sizing: border-box;
  min-width: 3rem;
  max-width: 3rem;
  min-height: 3rem;
  max-height: 3rem;
  border-radius: 50%;
  margin: 5px;
`;

const StyledMenu = styled.div`
  padding: var(--spacing-small);
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: 1;
  background-color: white;
  border-radius: 1rem;
  border-top-right-radius: 1px;
  border: 1px solid var(--color-shadow);
  box-shadow: 2px 5px 10px #999;
  max-width: 20rem;
`;

const StyledInput = styled.input<{ color?: string }>`
  outline: none;
  font: var(--font-large);
  color: var(--color-text-body);
  background-color: transparent;
  border: none;
  border-bottom: 2px solid var(--color-shadow);
  max-width: 100%;
  border-bottom-color: var(${(props) => props.color}, #ff5a5f);
`;

interface IEditTodoListProps {
  title: string;
  currentColor: string;
  listId: string;
  closeMenu: () => void;
}

function EditTodoList({
  listId,
  title,
  currentColor,
  closeMenu,
}: IEditTodoListProps) {
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const [editedColor, setEditedColor] = useState<string>(currentColor);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, dispatch } = useContext(GlobalContext);
  const uid = data.id;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleEditTitle = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setEditedTitle(event.currentTarget.value);
  };

  const saveChanges = () => {
    if (
      (editedTitle !== '' && editedTitle !== title) ||
      currentColor !== editedColor
    ) {
      fetch('/api/todolist/' + uid + '/' + listId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          color: editedColor,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: 'EDIT_TASK_LIST',
            payload: {
              taskListId: listId,
              updates: {
                title: editedTitle,
                settings: {
                  color: editedColor,
                },
              },
            },
          });
        });
    }
    closeMenu();
  };

  const deleteList = () => {
    fetch('/api/todolist/' + uid + '/' + listId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'DELETE_TASK_LIST',
          payload: {
            taskListId: listId,
          },
        });
      });
    closeMenu();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
      saveChanges();
    }
  };

  return (
    <>
      <BackgroundOverlay onClick={closeMenu} />
      <StyledMenu>
        <StyledInput
          type="text"
          value={editedTitle}
          onChange={handleEditTitle}
          onKeyPress={handleKeyPress}
          ref={inputRef}
          color={editedColor}
        />
        <ColorPickerContainer>
          {COLORS.map((color) => (
            <ColorPickerOption
              key={color}
              color={color}
              selected={editedColor === color}
              onClick={() => setEditedColor(color)}
            />
          ))}
        </ColorPickerContainer>
        <div>
          <SaveButton onClick={saveChanges}>
            <Text type="small" color="white">
              Save Changes
            </Text>
          </SaveButton>
          <DeleteButton onClick={deleteList}>
            <Text type="small">Delete List</Text>
          </DeleteButton>
        </div>
      </StyledMenu>
    </>
  );
}

export default EditTodoList;
