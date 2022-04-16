import React, { useEffect, useContext, useState } from 'react';
import GlobalContext from 'context/GlobalContext';
import styled from 'styled-components';
import Text from 'components/Common/Text';

const COLORS = [
  '--color-primary-1',
  '--color-primary-2',
  '--color-primary-3',
  '--color-primary-4',
  '--color-primary-5',
  '--color-primary-6',
  '--color-primary-7',
  '--color-primary',
];

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const StyledInput = styled.input<{ font?: string; color?: string }>`
  border: none;
  outline: none;
  text-overflow: ellipsis;
  border-bottom: 3px solid transparent;
  font: var(${(props) => '--font-' + (props.font || 'small')});
  color: var(${(props) => props.color || '--color-text-paragraph'});
  &::placeholder {
    color: var(--color-shadow);
  }
  margin: var(--spacing-tiny) 0;
  transition: border-color 0.2s;
  border-bottom: 2px solid var(--color-shadow);
  &:focus {
    border-bottom-color: var(--color-primary);
  }
`;

const ColorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0 var(--spacing-base) var(--spacing-base);
`;

const ColorOption = styled.div<{ color: string; selected?: boolean }>`
  min-width: 4rem;
  max-width: 4rem;
  min-height: 4rem;
  max-height: 4rem;
  border-radius: 50%;
  margin: var(--spacing-tiny);
  cursor: pointer;
  background-color: var(--color-primary);
  background-color: var(${(props) => props.color});
  transition: all 0.2s;
  border: 3px solid transparent;
  ${(props) => props.selected && 'border-color: var(--color-text-body);'}
  &:hover {
    transform: translateY(-3px);
  }
`;

const SaveButton = styled.button`
  cursor: pointer;
  outline: none;
  font: var(--font-small);
  font-size: 1.5rem;
  flex: 1 1 0px;
  margin: 0 var(--spacing-tiny);
  color: white;
  border: none;
  background-color: var(--color-primary);
  border-radius: 1rem;
  padding: 5px 10px;
`;

const Modal = styled.form`
  background-color: white;
  border-radius: 1rem;
  padding: var(--spacing-base);
  display: flex;
  flex-direction: column;
  max-width: 30rem;
`;

interface IAddCalendarModalProps {
  closeModal: () => void;
}

function AddCalendarModal({ closeModal }: IAddCalendarModalProps) {
  const { data, dispatch } = useContext(GlobalContext);
  const uid = data.id;
  const [todoListColor, setTodoListColor] = useState<string>(
    '--color-primary-1'
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = (event: React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    closeModal();
    const inputs: HTMLInputElement[] = Array.from(
      event.currentTarget.getElementsByTagName('input')
    );
    const formData = { title: '' };
    inputs.forEach((input) => {
      const { name, value } = input;
      (formData as any)[name] = value;
    });

    if (formData.title) {
      fetch('/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid,
          title: formData.title,
          color: todoListColor,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.id);
          dispatch({
            type: 'ADD_CALENDAR',
            payload: {
              calendar: {
                id: data.id,
                title: formData.title,
                settings: {
                  color: todoListColor,
                },
                events: [],
              },
            },
          });
        });
    }
  };

  return (
    <ModalBackground onClick={closeModal}>
      <Modal onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <Text
          type="heading3"
          styleProp="text-align: center;"
          margins={['none', 'none', 'small', 'none']}
          weight="500"
        >
          Create a Calendar
        </Text>
        <StyledInput
          type="text"
          name="title"
          placeholder="Calendar Name"
          required
        />
        <Text
          type="small"
          styleProp="var(--color-text-subtitle)"
          margins={['small', 'none', 'small', 'none']}
        >
          Select a Calendar Color:
        </Text>
        <ColorContainer>
          {COLORS.map((color) => (
            <ColorOption
              key={color}
              color={color}
              onClick={() => setTodoListColor(color)}
              selected={todoListColor === color}
            />
          ))}
        </ColorContainer>
        <SaveButton type="submit">Save</SaveButton>
      </Modal>
    </ModalBackground>
  );
}
export default AddCalendarModal;
// "id": "070083d6-97c1-4f9a-907a-1336f1c667c8",
//       "title": "Personal",
//       "settings": {
//         "color": "--color-primary-1"
//       },
//       "events": [
