import React from 'react';
import styled from 'styled-components';

import Text from 'components/Common/Text';

const StyledDate = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const DateMonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function DateDisplay() {
  const now = new Date();
  const date = now.getDate();
  const month = now.toLocaleString('default', { month: 'long' });
  return (
    <StyledDate>
      <DateMonthContainer>
        <Text type="heading1" weight="400" styleProp="line-height: 115%;">
          {date}
        </Text>
        <Text
          type="heading2"
          weight="300"
          color="var(--color-text-subtitle)"
          styleProp="line-height: 115%;"
        >
          {month}
        </Text>
      </DateMonthContainer>
    </StyledDate>
  );
}

export default DateDisplay;
