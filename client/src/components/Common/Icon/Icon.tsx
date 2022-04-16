import React from 'react';
import styled from 'styled-components';
import whiteTodo from 'assets/img/todo-icon-white.svg';
import defaultTodo from 'assets/img/todo-icon.svg';
import whiteCalendar from 'assets/img/calendar-icon-white.svg';
import defaultCalendar from 'assets/img/calendar-icon.svg';
import whiteAvatar from 'assets/img/user-icon-white.svg';
import defaultAvatar from 'assets/img/user-icon.svg';
import trashcan from 'assets/img/trash-can.svg';
import whiteTrashcan from 'assets/img/trash-can-white.svg';
import edit from 'assets/img/edit-pen.svg';
import chevronLeft from 'assets/img/chevron-left.svg';
import chevronRight from 'assets/img/chevron-right.svg';
import kebab from 'assets/img/kebab.svg';
import kebabBlack from 'assets/img/kebab-black.svg';
import paint from 'assets/img/paintbrush.svg';
import exit from 'assets/img/exit.svg';

interface IIconProps {
  type: string;
  height: number;
  white?: boolean;
  onClick?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  [name: string]: any;
}

const StyledImg = styled.img`
  cursor: pointer;
`;

function Icon({
  type,
  height,
  white = false,
  onClick = () => 1,
  ...otherProps
}: IIconProps) {
  switch (type) {
    case 'calendar':
      return (
        <StyledImg
          src={white ? whiteCalendar : defaultCalendar}
          onClick={onClick}
          height={height}
          alt=""
          {...otherProps}
        />
      );
    case 'todo':
      return (
        <StyledImg
          src={white ? whiteTodo : defaultTodo}
          onClick={onClick}
          height={height}
          alt=""
          {...otherProps}
        />
      );
    case 'avatar':
      return (
        <StyledImg
          src={white ? whiteAvatar : defaultAvatar}
          onClick={onClick}
          height={height}
          alt=""
          {...otherProps}
        />
      );
    case 'trash':
      return (
        <StyledImg
          src={white ? whiteTrashcan : trashcan}
          height={height}
          alt=""
          onClick={onClick}
          {...otherProps}
        />
      );
    case 'edit':
      return (
        <StyledImg
          src={edit}
          height={height}
          alt=""
          onClick={onClick}
          {...otherProps}
        />
      );
    case 'chevron-right':
      return (
        <StyledImg
          src={chevronRight}
          height={height}
          alt=""
          onClick={onClick}
          {...otherProps}
        />
      );
    case 'chevron-left':
      return (
        <StyledImg
          src={chevronLeft}
          height={height}
          alt=""
          onClick={onClick}
          {...otherProps}
        />
      );
    case 'kebab':
      return (
        <StyledImg
          src={white ? kebabBlack : kebab}
          height={height}
          alt=""
          onClick={onClick}
          {...otherProps}
        />
      );
    case 'paint':
      return (
        <StyledImg
          src={paint}
          height={height}
          alt=""
          onClick={onClick}
          {...otherProps}
        />
      );
    case 'exit':
      return (
        <StyledImg
          src={exit}
          height={height}
          alt=""
          onClick={onClick}
          {...otherProps}
        />
      );
    default:
      return (
        <StyledImg
          src={defaultTodo}
          alt=""
          height={height}
          onClick={onClick}
          {...otherProps}
        />
      );
  }
}

export default Icon;
