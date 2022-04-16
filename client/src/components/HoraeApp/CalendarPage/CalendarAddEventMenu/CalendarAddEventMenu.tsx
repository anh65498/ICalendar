import React, { useEffect, useContext } from 'react';
import GlobalContext from 'context/GlobalContext';
import styled from 'styled-components';
import useCalendars from 'hooks/useCalendars';
import { addHours } from 'date-fns';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

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
  border-bottom: 2px solid var(--color-shadow);
  &:focus {
    border-bottom-color: var(--color-primary);
  }
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

interface ICalendarAddEventMenuProps {
  x: number;
  y: number;
  closeModal: () => void;
  date: Date;
}

function CalendarAddEventMenu({
  x,
  y,
  closeModal,
  date,
}: ICalendarAddEventMenuProps) {
  const { data, dispatch } = useContext(GlobalContext);
  const uid = data.id;
  const calendarFields = useCalendars();
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
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
    const calendarId = event.currentTarget.getElementsByTagName('select')[0]
      .value;
    fetch('/api/calendar/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
        calendarId: calendarId,
        ...formData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.eventId);
        dispatch({
          type: 'ADD_CALENDAR_EVENT',
          payload: {
            eventId: data.eventId,
            calendarId: calendarId,
            event: formData,
          },
        });
      });
  };

  const handleCancelClick = (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    closeModal();
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
          font="large"
          color="--color-text-heading"
          type="text"
          placeholder="Event Name"
          name="name"
          required
        />
        <StyledInput
          type="datetime-local"
          placeholder="date"
          name="date"
          required
          defaultValue={defaultDate}
        />
        <StyledInput type="text" placeholder="Description" name="description" />
        <StyledInput type="text" placeholder="Location" name="location" />
        <StyledInput
          type="number"
          name="duration"
          placeholder="Enter duration in hours"
          min="1"
          max="23"
        />
        <select
          style={{ margin: 'var(--spacing-tiny) 0' }}
          name="calendar"
          id="calendar-select"
        >
          {calendarFields.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
        <ButtonContainer>
          <SaveButton type="submit">Save Changes</SaveButton>
          <DeleteButton onClick={handleCancelClick}>Cancel</DeleteButton>
        </ButtonContainer>
      </EditMenu>
    </>
  );
}

export default CalendarAddEventMenu;
