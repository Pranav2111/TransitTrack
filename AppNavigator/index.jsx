/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginAndSignup from '../screens/LoginAndSignup';
import {currentLocation} from '../atom/location';
import {useRecoilState} from 'recoil';
import {Platform} from 'react-native';
import {getLocation, requestLocationPermission} from './helper';
import Client from '../screens/Client';
import Driver from '../screens/Driver';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [_, setUserLocation] = useRecoilState(currentLocation);

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
          name="client-dashboard"
          component={Client}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="driver-dashboard"
          component={Driver}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
