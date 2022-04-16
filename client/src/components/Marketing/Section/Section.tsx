import React from 'react';
import styled from 'styled-components';

import Text from 'components/Common/Text';

interface ISectionProps {
  title?: string;
  subtitle?: string;
  background?: string;
  children?: React.ReactNode;
}

const SectionContent = styled.div`
  max-width: 136rem;
  margin: var(--spacing-large) auto;
`;

function Section({ title, background, subtitle, children }: ISectionProps) {
  const StyledSection = styled.section`
    padding: 8rem;
    display: flex;
    flex-direction: column;
    ${background && `background: ${background}`}
  `;
  return (
    <StyledSection>
      {title && (
        <Text type="heading2" weight="400" styleProp="align-self: center;">
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          type="regular"
          color="var(--color-text-subtitle)"
          styleProp="align-self: center; margin-top: var(--spacing-tiny);"
        >
          {subtitle}
        </Text>
      )}
      <SectionContent>{children}</SectionContent>
    </StyledSection>
  );
}

export default Section;
