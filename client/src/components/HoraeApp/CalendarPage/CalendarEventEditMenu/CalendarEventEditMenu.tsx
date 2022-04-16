import React, { useEffect, useContext } from 'react';
import GlobalContext from 'context/GlobalContext';
import styled from 'styled-components';
import { CalendarEvent } from 'context/controllers/calendarReducer';
import { addHours } from 'date-fns';

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
  max-width: 35rem;
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

type CalendarEventEditMenu = {
  x: number;
  y: number;
  calendarId: string;
  closeModal: () => void;
} & CalendarEvent;

function CalendarEventEditMenu({
  x,
  y,
  name,
  id,
  location,
  date,
  description,
  duration,
  calendarId,
  closeModal,
}: CalendarEventEditMenu) {
  const { data, dispatch } = useContext(GlobalContext);
  const uid = data.id;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closeModal();
    const inputs: HTMLInputElement[] = Array.from(
      event.currentTarget.getElementsByTagName('input')
    );
    const formData = {};
    inputs.forEach((input) => {
      if (input.type !== 'submit') {
        const { name, value } = input;
        if (input.type === 'datetime-local') {
          (formData as any)[name] = new Date(value).toString();
        } else (formData as any)[name] = value;
      }
    });

    fetch(`/api/calendar/events/${uid}/${calendarId}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'EDIT_CALENDAR_EVENT',
          payload: {
            eventId: id,
            calendarId: calendarId,
            event: formData,
          },
        });
      });
  };

  const handleDeleteEvent = () => {
    closeModal();

    fetch(`/api/calendar/events/${uid}/${calendarId}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'DELETE_CALENDAR_EVENT',
          payload: {
            calendarId: calendarId,
            eventId: id,
          },
        });
      });
  };

  const isoStr = addHours(
    new Date(date),
    -new Date().getTimezoneOffset() / 60
  ).toISOString();
  const defaultDate = isoStr.substring(0, isoStr.length - 1);

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
          placeholder="name"
          name="name"
          defaultValue={name}
        />
        <StyledInput
          type="text"
          placeholder="location"
          name="location"
          defaultValue={location}
        />
        <StyledInput
          type="datetime-local"
          placeholder="date"
          name="date"
          defaultValue={defaultDate}
        />
        <StyledInput
          type="text"
          placeholder="description"
          name="description"
          defaultValue={description}
        />
        <StyledInput
          type="text"
          placeholder="duration"
          name="duration"
          defaultValue={duration}
        />
        <ButtonContainer>
          <SaveButton type="submit">Save Changes</SaveButton>
          <DeleteButton onClick={handleDeleteEvent}>Delete Event</DeleteButton>
        </ButtonContainer>
      </EditMenu>
    </>
  );
}

export default CalendarEventEditMenu;
