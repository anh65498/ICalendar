import React, { useState } from 'react';
import styled from 'styled-components';
import Text from 'components/Common/Text';
import Icon from 'components/Common/Icon';
import { isToday } from 'date-fns';
import AddCalendarModal from 'components/HoraeApp/CalendarPage/AddCalendarModal';

const Today = styled.span<{ active: boolean }>`
  ${(props) =>
    props.active &&
    `min-width: 3.5rem;
  max-width: 3.5rem;
  min-height: 3.5rem;
  max-height: 3.5rem;
  border-radius: 50%;
  background-color: var(--color-primary);
  display: grid;
  place-items: center;`}
  font-size: 1.5rem;
  margin-left: var(--spacing-tiny);
`;

const CalendarDays = styled.div`
  margin-top: var(--spacing-tiny);
  display: grid;
  grid-template-columns: repeat(7, minmax(15rem, 1fr));
  grid-template-rows: 5rem;
  align-items: center;
  background-color: var(--color-bg-nav);
  padding: var(--spacing-tiny) 0;
  border-radius: 1.5rem;
`;

const DayDateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddCalendarButton = styled.button`
  background-color: var(--color-primary);
  border-radius: 1rem;
  outline: none;
  border: none;
  padding: var(--spacing-tiny);
  cursor: pointer;
`;

interface IWeekHeader {
  dates: Date[];
  showBackButton?: boolean;
  changeWeeks: (numWeeks: number) => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const composeDateString = (
  startDate: string,
  startDay: number,
  endDate: string,
  endDay: number
) => {
  const endDateString = endDate === startDate ? '' : endDate;
  return `${startDate} ${
    startDay + dateOrdinalHelper(startDay)
  } – ${endDateString} ${endDay + dateOrdinalHelper(endDay)}`;
};

const dateOrdinalHelper = (day: number): string => {
  return '';
  // if (day > 3 && day < 21) return 'th';
  // switch (day % 10) {
  //   case 1:
  //     return 'st';
  //   case 2:
  //     return 'nd';
  //   case 3:
  //     return 'rd';
  //   default:
  //     return 'th';
  // }
};

const StyledWeekToggler = styled.span`
  display: grid;
  grid-template-columns: 3rem 18rem 3rem 12rem 2rem;
  align-items: center;
  justify-items: center;
`;

const StyledTodayButton = styled.div`
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background: var(--color-bg-nav);
  color: var(--color-text-subtitle);
`;

function WeekHeader({
  dates,
  changeWeeks,
  showBackButton = false,
}: IWeekHeader) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [startDate, startDay] = [
    dates[0].toLocaleString('default', {
      month: 'short',
    }),
    dates[0].getDate(),
  ];
  const [endDate, endDay] = [
    dates[dates.length - 1].toLocaleString('default', {
      month: 'short',
    }),
    dates[dates.length - 1].getDate(),
  ];

  const toggleModal = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setShowModal(!showModal);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledWeekToggler>
          <Icon
            type="chevron-left"
            height={20}
            onClick={() => changeWeeks(-1)}
          />
          <Text type="large">
            {composeDateString(startDate, startDay, endDate, endDay)}
          </Text>
          <Icon
            type="chevron-right"
            height={20}
            onClick={() => changeWeeks(1)}
          />
          {showBackButton && (
            <StyledTodayButton onClick={() => changeWeeks(0)}>
              <Text type="tiny">This Week</Text>
            </StyledTodayButton>
          )}
        </StyledWeekToggler>

        {showModal && (
          <AddCalendarModal closeModal={() => setShowModal(false)} />
        )}
        <AddCalendarButton onClick={toggleModal}>
          <Text type="small" weight="400" color="white">
            Add Calendar
          </Text>
        </AddCalendarButton>
      </div>
      <CalendarDays>
        {dates.map((date, index) => (
          <DayDateContainer key={date.toString()}>
            <Text type="small">{DAYS[index % DAYS.length]}</Text>
            <Today active={isToday(date)}>
              <Text type="small" color={isToday(date) ? 'white' : ''}>
                {date.getDate()}
              </Text>
            </Today>
          </DayDateContainer>
        ))}
      </CalendarDays>
    </div>
  );
}

export default WeekHeader;
