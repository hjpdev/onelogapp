import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { Container } from './Components/Container'
import { MainHeader } from './Components/MainHeader'
import { NavBar } from './Components/NavBar'

const App: () => React.Node = () => {
  const [currentScreen, setCurrentScreen] = useState('Home')

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <MainHeader />
        <Container currentScreen={currentScreen} />
        <NavBar setCurrentScreen={setCurrentScreen}/>
      </SafeAreaView>
    </>
  );
};

export default App;
