import React, { useState } from 'react';
import styled from 'styled-components';

import calendar from 'assets/img/calendar.svg';

import Text from 'components/Common/Text';

const StyledHero = styled.div`
  background-color: var(--color-bg-light);
  height: 100vh;
`;

const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid var(--color-primary);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin: var(--spacing-large) auto 0;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div`
  max-width: 136rem;
  padding: 4rem 8rem 8rem;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-column-gap: var(--spacing-large);
`;

// const StyledHeroText = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const HeroButton = styled.button`
//   flex-grow: 0;
//   align-self: start;
//   padding: 1rem 2rem;
//   background-color: var(--color-primary);
//   border: 0;
//   border-radius: 4rem;
//   outline: none;
//   cursor: pointer;
//   margin-bottom: var(--spacing-xlarge);
//   box-shadow: 6px 6px 11px #d9d9d9, -6px -6px 11px var(--color-white);
//   transition: transform 0.2s;
//   &:hover {
//     transform: translateY(-3px);
//   }
//   &:active {
//     transform: translate(2px, 0px);
//   }
// `;

const StyledForm = styled.form`
  padding: var(--spacing-base);
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 3px 10px rgba(200, 200, 200, 0.5);
  display: flex;
  flex-direction: column;
  margin: auto;
  min-width: 35rem;
  max-width: 35rem;
  min-height: 40rem;
  max-height: 40rem;
`;

const StyledInput = styled.input`
  margin: var(--spacing-base) 0;
  font: var(--font-regular);
  border: none;
  outline: none;
  border-bottom: 2px solid var(--color-shadow);
  &:focus {
    border-bottom-color: var(--color-primary);
  }
`;

const SaveButton = styled.button`
  cursor: pointer;
  outline: none;
  font: var(--font-small);
  font-size: 1.5rem;
  margin: auto var(--spacing-tiny) var(--spacing-tiny);
  color: white;
  border: none;
  background-color: var(--color-primary);
  border-radius: 1rem;
  padding: var(--spacing-tiny);
`;

interface IHeroProps {
  setLoggedIn: (loggedIn: boolean, uid: string) => void;
}

function Hero({ setLoggedIn }: IHeroProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    const inputs: HTMLInputElement[] = Array.from(
      event.currentTarget.getElementsByTagName('input')
    );
    const formData = { email: '', password: '' };
    inputs.forEach((input) => {
      const { name, value } = input;
      (formData as any)[name] = value;
    });
    fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { uid, code } = data;
        console.log(uid);
        if (uid) {
          setTimeout(() => setLoggedIn(true, uid), 1000);
        } else if (code) {
          setTimeout(() => {
            setLoading(false);
            setError(true);
          }, 1000);
        } else {
          setTimeout(() => setLoading(false), 1000);
        }
      });
    console.log(`email: ${formData.email}, password: ${formData.password}`);
  };

  return (
    <StyledHero>
      <Container>
        <div>
          <StyledForm onSubmit={handleFormSubmit}>
            <Text
              type="heading1"
              color="var(--color-text-body);"
              styleProp="text-align: center"
            >
              Log In
            </Text>
            {loading ? (
              <Loader />
            ) : (
              <>
                <StyledInput name="email" type="email" placeholder="email" />
                <StyledInput
                  name="password"
                  type="password"
                  placeholder="password"
                />
              </>
            )}
            {error && (
              <Text
                type="heading3"
                color="var(--color-primary-1)"
                styleProp="text-align: center;"
              >
                Invalid Credentials
              </Text>
            )}
            <SaveButton type="submit">Log In</SaveButton>
          </StyledForm>
        </div>
        {/* <StyledHeroText>
          <Text
            type="heading1"
            weight="600"
            margins={['xlarge', 'none', 'large', 'none']}
            size="8rem"
          >
            Horae
          </Text>
          <Text type="heading2">Maximizing your productivity</Text>
          <Text
            type="regular"
            color="var(--color-text-paragraph)"
            margins={['tiny', 'none', 'large']}
            styleProp="max-width: 34ch; margin-left: 4px;"
          >
            By getting started, you already took the first step in your journey
            to personal productivity and self-organization. Let Horae be your
            guide along the way.
          </Text>
          <HeroButton>
            <Text type="small" color="var(--color-white)" weight="400">
              Learn More
            </Text>
          </HeroButton>
        </StyledHeroText> */}
        <img src={calendar} alt="calendar" />
      </Container>
    </StyledHero>
  );
}

export default Hero;
