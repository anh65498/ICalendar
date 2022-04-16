import React from 'react';
import styled from 'styled-components';
import Text from 'components/Common/Text';

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
  background-color: var(--color-bg-light);
  border-radius: 1rem;
  min-width: 18rem;
  box-shadow: var(--box-shadow);
  max-width: 20rem;
  margin: var(--spacing-base);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-6px);
  }
`;

interface IAboutItemProps {
  name: string;
  text: string;
  icon: string;
}

function AboutItem({ name, text, icon }: IAboutItemProps) {
  return (
    <StyledItem>
      <img src={icon} height="80" alt="" />
      <Text
        type="heading3"
        styleProp="font-family: Brandon;"
        color="var(--color-text-body)"
        margins={['base', 'none', 'small', 'none']}
      >
        {name}
      </Text>
      <Text type="small" color="var(--color-text-paragraph)">
        {text}
      </Text>
    </StyledItem>
  );
}

export default AboutItem;
