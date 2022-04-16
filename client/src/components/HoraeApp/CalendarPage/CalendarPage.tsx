import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import Text from 'components/Common/Text';

interface ICalendarPageProps {
  children: React.ReactNode;
}
const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleButton = styled.div`
  padding: 1rem 2rem;
  border-radius: 1rem;
  background: var(--color-bg-nav);
  min-width: 6rem;
  max-width: 6rem;
  text-align: center;
  margin: 0 var(--spacing-tiny);
  transition: all 0.2s;
  &:hover {
    box-shadow: var(--box-shadow);
    transform: translateY(-3px);
  }
`;

function CalendarPage({ children }: ICalendarPageProps) {
  return (
    <PageBody>
      <ToggleContainer>
        <Link to="/calendar">
          <ToggleButton>
            <Text type="small">Week</Text>
          </ToggleButton>
        </Link>
        <Link to="/calendar/month">
          <ToggleButton>
            <Text type="small">Month</Text>
          </ToggleButton>
        </Link>
      </ToggleContainer>
      {children}
    </PageBody>
  );
}

export default CalendarPage;
