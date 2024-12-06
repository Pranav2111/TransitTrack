/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';
import {useRecoilValue} from 'recoil';
import {user} from '../../atom/authAtom';
import {useNavigation, useNavigationState} from '@react-navigation/native';

const LoginSignup = () => {
  const userDetails = useRecoilValue(user);

  const [currentForm, setCurrentForm] = useState('login');

  const navigation = useNavigation();
  const routeName = useNavigationState(state => state.routes[state.index].name);

  const isLoginForm = currentForm == 'login';

  const handleFormSwitch = () => {
    setCurrentForm(currentForm == 'login' ? 'sign-up' : 'login');
  };

  useEffect(() => {
    if (routeName === 'login-signup' && userDetails?.redirect_screen) {
      navigation.navigate(userDetails.redirect_screen);
    }
  }, [routeName]);

  return (
    <View style={styles.container}>
      <View style={styles.bgImageContainer}>
        <ImageBackground
          source={require('../../assets/login_bg.jpg')}
          style={styles.background}
        />
      </View>
      <View style={styles.parentBox}>
        <View style={styles.switch}>
          <TouchableOpacity
            style={
              isLoginForm ? styles.activeSwitchButton : styles.switchButton
            }
            onPress={handleFormSwitch}>
            <Text
              style={
                isLoginForm
                  ? styles.activeSwitchButtonText
                  : styles.switchButtonText
              }>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              isLoginForm ? styles.switchButton : styles.activeSwitchButton
            }
            onPress={handleFormSwitch}>
            <Text
              style={
                isLoginForm
                  ? styles.switchButtonText
                  : styles.activeSwitchButtonText
              }>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {isLoginForm ? <LoginForm /> : <SignUpForm />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    filter: 'blur(1)',
    marginBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#d4d4d4',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  bgImageContainer: {
    backgroundColor: 'grey',
    width: 500,
    height: 500,
    borderRadius: '50%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: 'hidden',
  },
  parentBox: {
    position: 'absolute',
    width: '90%',
    maxWidth: 340,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    paddingHorizontal: 30,
    paddingVertical: 20,
    top: '35%',
  },
  switch: {
    width: 200,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 50,
  },
  switchButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 50,
  },
  activeSwitchButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.1,
    borderRadius: 50,
    color: 'white',
    backgroundColor: '#2399dd',
  },
  activeSwitchButtonText: {
    fontWeight: 500,
    fontSize: 16,
    color: 'white',
  },
  switchButtonText: {
    fontWeight: 500,
    fontSize: 16,
    color: '#2399dd',
  },
  loginBox: {
    height: '80%',
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  signUpBox: {
    height: '90%',
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 40,
    fontSize: 16,
  },
  button: {
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    width: 50,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signUpbuttonText: {
    width: 70,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LoginSignup;
