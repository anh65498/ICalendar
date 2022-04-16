import React from 'react';
import NavBar from 'components/Marketing/NavBar';
import Hero from 'components/Marketing/Hero';

interface IMarketingProps {
  setLoggedIn: (loggedIn: boolean, uid: string) => void;
}

function Marketing({ setLoggedIn }: IMarketingProps) {
  return (
    <div>
      <NavBar />
      <Hero setLoggedIn={setLoggedIn} />
      {/* 
      <Hero />
      <About />
      <Product /> */}
    </div>
  );
}

export default Marketing;
