import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { Container } from './src/Components/Container'
import { MainHeader } from './src/Components/MainHeader'
import { NavBar } from './src/Components/NavBar'

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('home')

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

export default App
