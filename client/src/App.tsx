import React, { useState } from 'react';
import HoraeApp from 'components/HoraeApp';
import Marketing from 'components/Marketing';

import 'assets/styles/global.scss';

function App() {
  const userToken = localStorage.getItem('horaeUser') || '';
  const [userId, setUserId] = useState(userToken);
  const [loggedIn, setLoggedIn] = useState<boolean>(!!userToken);
  const handleLogin = (loggedIn: boolean, uid: string) => {
    setLoggedIn(loggedIn);
    setUserId(uid);
    localStorage.setItem('horaeUser', uid);
  };
  return loggedIn ? (
    <HoraeApp uid={userId} />
  ) : (
    <Marketing setLoggedIn={handleLogin} />
  );
}

export default App;
