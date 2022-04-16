import React, { useState } from 'react';
import styled from 'styled-components';
import Text from 'components/Common/Text';
import Icon from 'components/Common/Icon';
import EditCalendarMenu from 'components/HoraeApp/CalendarPage/EditCalendarMenu';
import useCalendars, { CalendarFields } from 'hooks/useCalendars';

const StyledWidget = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarItem = styled.div`
  display: grid;
  grid-template-columns: 2rem 1fr 3rem;
  cursor: pointer;
  grid-column-gap: 5px;
  align-items: center;
  margin: 3px 0;
  img {
    visibility: hidden;
    margin-left: auto;
  }
  &:hover {
    img {
      visibility: visible;
    }
  }
`;

const CalendarColor = styled.div<{ color: string }>`
  min-width: 1.25rem;
  max-width: 1.25rem;
  max-height: 1.25rem;
  min-height: 1.25rem;
  border-radius: 50%;
  background-color: var(${(props) => props.color});
`;

function CalendarsWidget() {
  const calendars = useCalendars();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [calendarData, setCalendarData] = useState<CalendarFields>(
    calendars[0]
  );
  const [clickCoordinates, setClickCoordinates] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const toggleMenu = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const { clientX, clientY } = event;
    setClickCoordinates({ x: clientX, y: clientY });
    setCalendarData(calendars[index]);
    setShowMenu(!showMenu);
  };

  return (
    <StyledWidget>
      <Text
        type="large"
        styleProp="text-align: center; margin: var(--spacing-base) 0 var(--spacing-tiny) 0;"
      >
        Calendars
      </Text>
      {showMenu && (
        <EditCalendarMenu
          title={calendarData.title}
          x={clickCoordinates.x}
          calendarId={calendarData.id}
          y={clickCoordinates.y}
          color={calendarData.settings.color}
          closeModal={() => setShowMenu(false)}
        />
      )}
      {calendars.map(
        (calendar, index) =>
          calendar.id && (
            <CalendarItem
              key={`calendar-item-${calendar.id}`}
              onClick={(e) => toggleMenu(e, index)}
            >
              <CalendarColor color={calendar.settings.color} />
              <Text
                type="small"
                styleProp="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;`"
                key={calendar.id}
              >
                {calendar.title}
              </Text>
              <Icon type="kebab" white={true} height={15} />
            </CalendarItem>
          )
      )}
    </StyledWidget>
  );
}

export default CalendarsWidget;
