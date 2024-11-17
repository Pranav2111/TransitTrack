import React from 'react';
import {RecoilRoot} from 'recoil';
import AppNavigator from './AppNavigator';

const App = () => {
  return (
    <RecoilRoot>
      <AppNavigator />
    </RecoilRoot>
  );
};

export default App;
