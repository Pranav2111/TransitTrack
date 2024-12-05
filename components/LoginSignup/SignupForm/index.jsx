import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {jwt, user} from '../../../atom/authAtom';

const SignUpForm = () => {
  const [_, setToken] = useRecoilState(jwt);
  const [_u, setUser] = useRecoilState(user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleInput = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const {name, email, password, confirmPassword} = formData || {};

    if (!email || !password || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill out all the fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Password mismatch',
        'The passwords you entered do not match. Please try again.',
      );
      return;
    }

    setIsLoading(true);

    axios
      .post('http://192.168.0.103:5000/api/auth/signup', {
        name,
        email,
        password,
      })
      .then(response => {
        const {user: userDetail, token} = response?.data || {};
        const {redirect_screen} = userDetail || {};
        setToken(token);
        setUser(userDetail);
        setTimeout(() => {
          setIsLoading(false);
          navigation.navigate(redirect_screen);
        }, 1000);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.signUpBox}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={formData.name}
        onChangeText={value => handleInput('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={formData.email}
        onChangeText={value => handleInput('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={formData.password}
        onChangeText={value => handleInput('password', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={value => handleInput('confirmPassword', value)}
      />
      <TouchableOpacity
        disabled={isLoading}
        onPress={handleSubmit}
        style={[styles.button, isLoading && styles.disabledButton]}>
        <Text style={styles.signUpbuttonText}>
          {isLoading ? 'Loading...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  signUpBox: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 40,
    fontSize: 16,
  },
  button: {
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2399dd',
    borderRadius: 50,
  },
  disabledButton: {
    backgroundColor: '#5793c4',
  },
  signUpbuttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SignUpForm;
