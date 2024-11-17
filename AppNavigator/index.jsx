/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginAndSignup from '../screens/LoginAndSignup';
import Home from '../screens/Home';
import {currentLocation} from '../atom/location';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {Platform} from 'react-native';
import {getLocation, requestLocationPermission} from './helper';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  // const resetFunctions = atoms.map(atom => useResetRecoilState(atom));
  const [_, setUserLocation] = useRecoilState(currentLocation);

  // Reset all atoms on component mount
  // resetFunctions.forEach(reset => reset());

  useLayoutEffect(() => {
    const fetchLocation = async () => {
      if (Platform.OS === 'android') {
        try {
          await requestLocationPermission();
          getLocation(setUserLocation);
        } catch (error) {
          console.error('Location permission error', error);
        }
      } else {
        getLocation(setUserLocation);
      }
    };

    fetchLocation();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login-signup">
        <Stack.Screen
          name="login-signup"
          component={LoginAndSignup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
