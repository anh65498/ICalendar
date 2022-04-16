import React from 'react';
import styled from 'styled-components';
import logo from 'assets/img/logo.svg';
import CalendarsWidget from 'components/HoraeApp/CalendarPage/CalendarsWidget';

import AppNavItem from 'components/HoraeApp/AppNavbar/AppNavItem';

const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-nav);
  padding: var(--spacing-base);
  box-sizing: border-box;
  align-items: center;
  margin: var(--spacing-tiny);
  border-radius: 2rem;
  max-width: 25rem;
  min-width: 25rem;
`;

const Logo = styled.img`
  margin-bottom: var(--spacing-xlarge);
`;

type AppNavItem = {
  title: string;
  icon: string;
  to: string;
};

interface IAppNavbarProps {
  items: AppNavItem[];
}

function AppNavbar({ items }: IAppNavbarProps) {
  return (
    <StyledNavbar>
      <Logo src={logo} height={150} />
      {items.map((item, index) => (
        <AppNavItem key={`App-nav-item-${index}`} {...item} />
      ))}
      <CalendarsWidget />
    </StyledNavbar>
  );
}

export default AppNavbar;
