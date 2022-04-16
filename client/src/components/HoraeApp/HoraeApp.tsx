import React, { useReducer, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Text from 'components/Common/Text';
import mockData from 'assets/data/mockUserData.json';
import styled from 'styled-components';
import AppNavbar from 'components/HoraeApp/AppNavbar';
import CalendarPage from 'components/HoraeApp/CalendarPage';
import CalendarWeek from 'components/HoraeApp/CalendarPage/CalendarWeek';
import CalendarMonth from 'components/HoraeApp/CalendarPage/CalendarMonth';
import TodoPage from 'components/HoraeApp/TodoPage';
import AvatarPage from 'components/HoraeApp/AvatarPage';
import globalReducer from 'context/GlobalReducer';
import GlobalContext from 'context/GlobalContext';

const ITEMS = [
  {
    title: 'Calendar',
    icon: 'calendar',
    to: '/calendar',
  },
  {
    title: 'Todo',
    icon: 'todo',
    to: '/todo',
  },
  {
    title: 'Avatar',
    icon: 'avatar',
    to: '/avatar',
  },
];

const StyledApp = styled.div`
  display: flex;
  min-height: 100vh;
`;

const StyledAppBody = styled.div`
  padding: var(--spacing-large) var(--spacing-base);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

interface IHoraeAppProps {
  uid: string;
}

function HoraeApp({ uid }: IHoraeAppProps) {
  const storedData = JSON.parse(localStorage.getItem('horaeData') || '{}');
  const defaultData =
    typeof storedData === 'object' && storedData.id
      ? { ...storedData, id: uid }
      : { ...mockData, id: uid };
  const [state, dispatch] = useReducer(globalReducer, defaultData);

  useEffect(() => {
    fetch('/api/auth/' + uid)
      .then((res) => res.json())
      .then((data) => {
        const cleanedData = {
          todo_lists: [],
          ...data,
          calendars:
            data.calendars?.map((calendar: any) => ({
              events: [],
              ...calendar,
            })) || [],
        };
        dispatch({ type: 'UPDATE_STATE', payload: cleanedData });
      })
      .catch((err) => console.log(err));
  }, [uid]);

  return (
    <GlobalContext.Provider value={{ data: state, dispatch }}>
      <StyledApp>
        <Router>
          <AppNavbar items={ITEMS} />
          <StyledAppBody>
            <Text
              type="large"
              styleProp="margin: 0 var(--spacing-tiny) var(--spacing-base) auto; cursor: pointer;"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Log Out
            </Text>
            <Switch>
              <Route path="/todo" component={TodoPage} exact />
              <Route path="/avatar" component={AvatarPage} exact />
              <Route path="/calendar/month" exact>
                <CalendarPage>
                  <CalendarMonth />
                </CalendarPage>
              </Route>
              <Route path={['/calendar', '/calendar/week']} exact>
                <CalendarPage>
                  <CalendarWeek />
                </CalendarPage>
              </Route>
              <Route path="/">
                <Redirect to="/calendar" />
              </Route>
            </Switch>
          </StyledAppBody>
        </Router>
      </StyledApp>
    </GlobalContext.Provider>
  );
}

export default HoraeApp;
