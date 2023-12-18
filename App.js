// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation';
import { StateContextProvider } from './src/context';





function App() {
  return (
    <NavigationContainer>
      <StateContextProvider>
       <Navigation/>
       </StateContextProvider>
    </NavigationContainer>
  );
}

export default App;
