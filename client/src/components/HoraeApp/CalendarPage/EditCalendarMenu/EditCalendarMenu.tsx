import React, { useEffect, useContext, useState } from 'react';
import GlobalContext from 'context/GlobalContext';
import styled from 'styled-components';

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

const calculatedBorder = (x: number, y: number) => {
  const xOffset = x + 250;
  const yOffset = y + 300;
  if (xOffset > window.innerWidth && yOffset > window.innerHeight) {
    return 'border-bottom-right-radius: 0px;';
  } else if (xOffset > window.innerWidth) {
    return 'border-top-right-radius: 0px;';
  } else if (yOffset > window.innerHeight) {
    return 'border-bottom-left-radius: 0px;';
  }
  return 'border-top-left-radius: 0px;';
};

const StyledInput = styled.input<{ font?: string; color?: string }>`
  border: none;
  outline: none;
  text-overflow: ellipsis;
  border-bottom: 3px solid transparent;
  text-align: center;
  font: var(${(props) => '--font-' + (props.font || 'small')});
  color: var(${(props) => props.color || '--color-text-paragraph'});
  &::placeholder {
    color: var(--color-shadow);
  }
  margin: var(--spacing-tiny) 0;
  transition: border-color 0.2s;
  &:focus {
    border-bottom-color: var(--color-primary);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const EditMenu = styled.form<{ x: number; y: number }>`
  position: fixed;
  z-index: 2;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: white;
  min-width: 25rem;
  max-width: 25rem;
  padding: var(--spacing-base);
  border-radius: 1rem;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
    ${(props) =>
      props.x + 250 > window.innerWidth
        ? `right: ${window.innerWidth - props.x}px;`
        : `left: ${props.x}px;`}
    ${(props) =>
      props.y + 300 > window.innerHeight
        ? `bottom: ${window.innerHeight - props.y}px;`
        : `top: ${props.y}px;`}
    ${(props) => calculatedBorder(props.x, props.y)};
`;

const ColorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-base);
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SaveButton = styled.button`
  cursor: pointer;
  outline: none;
  font: var(--font-small);
  font-size: 1.5rem;
  flex: 1 1 0px;
  margin: 0 var(--spacing-tiny);
  color: white;
  border: none;
  background-color: var(--color-primary);
  border-radius: 1rem;
  padding: var(--spacing-tiny);
`;
const DeleteButton = styled.button`
  cursor: pointer;
  outline: none;
  font: var(--font-small);
  font-size: 1.5rem;
  flex: 1 1 0px;
  margin: 0 var(--spacing-tiny);
  border: none;
  background-color: var(--color-shadow);
  border-radius: 1rem;
  padding: var(--spacing-tiny);
`;

interface IEditCalendarMenuProps {
  x: number;
  y: number;
  calendarId: string;
  color: string;
  title: string;
  closeModal: () => void;
}

function EditCalendarMenu({
  x,
  y,
  title,
  calendarId,
  color,
  closeModal,
}: IEditCalendarMenuProps) {
  const { data, dispatch } = useContext(GlobalContext);
  const uid = data.id;
  const [calendarColor, setCalendarColor] = useState<string>(color);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closeModal();
    const newTitle = Array.from(
      event.currentTarget.getElementsByTagName('input')
    )[0].value;
    fetch('/api/calendar/' + uid + '/' + calendarId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle, color: calendarColor }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'EDIT_CALENDAR',
          payload: {
            calendarId: calendarId,
            updates: {
              title: newTitle,
              settings: {
                color: calendarColor,
              },
            },
          },
        });
      });
  };

  const handleDeleteEvent = () => {
    closeModal();
    fetch('/api/calendar/' + uid + '/' + calendarId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'DELETE_CALENDAR',
          payload: {
            calendarId: calendarId,
          },
        });
      });
  };

  return (
    <>
      <Overlay
        onClick={(e) => {
          e.stopPropagation();
          closeModal();
        }}
      />
      <EditMenu
        x={x}
        y={y}
        onSubmit={handleFormSubmit}
        action=""
        onClick={(e) => e.stopPropagation()}
      >
        <StyledInput
          font="heading3"
          color="--color-text-heading"
          type="text"
          placeholder="title"
          name="title"
          defaultValue={title}
        />
        <ColorContainer>
          {COLORS.map((color) => (
            <ColorOption
              key={color}
              color={color}
              onClick={() => setCalendarColor(color)}
              selected={calendarColor === color}
            />
          ))}
        </ColorContainer>
        <ButtonContainer>
          <SaveButton type="submit">Save</SaveButton>
          <DeleteButton onClick={handleDeleteEvent}>Delete</DeleteButton>
        </ButtonContainer>
      </EditMenu>
    </>
  );
}

export default EditCalendarMenu;
