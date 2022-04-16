import React from 'react';
import styled from 'styled-components';

import DateDisplay from 'components/HoraeApp/Header/DateDisplay';

const StyledHeader = styled.div``;

function Header() {
  return (
    <StyledHeader>
      <DateDisplay />
    </StyledHeader>
  );
}

export default Header;
