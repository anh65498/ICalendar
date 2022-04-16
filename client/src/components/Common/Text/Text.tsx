import React from 'react';
import styled from 'styled-components';
import styles from 'components/Common/Text/Text.module.scss';

type TextWeight = '300' | '400' | '500' | '600' | '700';
type TextMargin = 'none' | 'tiny' | 'small' | 'base' | 'large' | 'xlarge';
type TextType =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'large'
  | 'regular'
  | 'small'
  | 'smaller'
  | 'tiny';

interface ITextProps {
  type?: TextType;
  size?: string;
  weight?: TextWeight;
  color?: string;
  margins?: TextMargin[];
  styleProp?: string;
  children: React.ReactNode;
  // rest Props
  [name: string]: any;
}

const CustomText = styled.span<ITextProps & { mappedMargins: string }>`
    display: inline-block;
    ${(props) => props.size && `font-size: ${props.size};`}
    ${(props) => props.weight && `font-weight: ${props.weight};`}
    ${(props) => props.color && `color: ${props.color};`}
    ${(props) => props.margins && `margin: ${props.mappedMargins};`}
    line-height: 140%;
    ${(props) => props.styleProp && props.styleProp}
`;

function Text({
  children,
  type,
  size,
  weight,
  color,
  margins,
  styleProp,
  ...otherProps
}: ITextProps) {
  const mappedMargins =
    (margins?.length === 1
      ? new Array(4).fill(`var(--spacing-${margins[0]})`).join(' ')
      : margins?.map((margin) => `var(--spacing-${margin})`).join(' ')) || '';

  return (
    <CustomText
      size={size}
      weight={weight}
      color={color}
      margins={margins}
      styleProp={styleProp}
      className={type && styles[type]}
      mappedMargins={mappedMargins}
      {...otherProps}
    >
      {children}
    </CustomText>
  );
}

export default Text;
