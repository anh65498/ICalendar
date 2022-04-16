import React from 'react';
import styled from 'styled-components';
import Text from 'components/Common/Text';

const StyledClothingSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: var(--spacing-small);
`;

const StyledItem = styled.div<{
  active: boolean;
  offset: string;
  noCrop?: boolean;
}>`
  padding: var(--spacing-tiny);
  border-radius: 1rem;
  box-shadow: var(--box-shadow);
  cursor: pointer;
  margin: var(--spacing-tiny);
  display: flex;
  flex-direction: column;
  min-width: 14rem;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--color-shadow);
  ${(props) => props.active && 'border-color: var(--color-primary);'}
  ${(props) =>
    props.noCrop
      ? ''
      : `img {
    width: 15rem;
    height: 10rem;
    object-position: 0 ${props.offset || '0'}px;
    object-fit: cover;
  }`}
`;

interface IClothingSelectProps {
  title: string;
  editAvatar: (index: number) => void;
  active: number;
  offset: string;
  noCrop?: boolean;
  items: {
    name: string;
    src: string;
  }[];
}

function ClothingSelect({
  items,
  title,
  noCrop = false,
  editAvatar,
  offset,
  active,
}: IClothingSelectProps) {
  return (
    <>
      <Text
        type="heading2"
        styleProp="display: block; text-align: center; margin-top: var(--spacing-base);"
      >
        {title}
      </Text>
      <StyledClothingSelect>
        {items.map((item, index) => (
          <StyledItem
            key={item.src}
            noCrop={noCrop}
            offset={offset}
            onClick={() => editAvatar(index)}
            active={active === index}
          >
            <Text type="large">{item.name}</Text>
            <img src={item.src} height="300" alt="" />
          </StyledItem>
        ))}
        <StyledItem
          offset={offset}
          onClick={() => editAvatar(-1)}
          active={active === -1}
        >
          <Text type="large">None</Text>
        </StyledItem>
      </StyledClothingSelect>
    </>
  );
}

export default ClothingSelect;
