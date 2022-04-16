import React from 'react';
import mockData from 'assets/data/mockUserData.json';
import { Action } from 'context/GlobalReducer';

const GlobalContext = React.createContext({
  data: mockData,
  dispatch: (arg0: Action) => {},
});

export default GlobalContext;
