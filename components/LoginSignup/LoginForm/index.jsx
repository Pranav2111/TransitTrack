import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {jwt, user} from '../../../atom/authAtom';

const LoginForm = () => {
  const [_t, setToken] = useRecoilState(jwt);
  const [_u, setUser] = useRecoilState(user);

  const [formData, setFormData] = useState({email: '', password: ''});
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleInput = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const {email, password} = formData || {};

    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill out all the fields.');
      return;
    }

    setIsLoading(true);

    axios
      .post('http://192.168.0.103:5000/api/auth/login', {
        email: email,
        password: password,
      })
      .then(response => {
        const {token, redirect_screen} = response?.data?.user || {};
        setToken(token);
        setUser(response.data?.user);
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
    <View style={styles.loginBox}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={formData.userName}
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
      <TouchableOpacity
        style={[styles.button, isLoading && styles.disabledButton]}
        disabled={isLoading}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Logging In...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginBox: {
    width: '100%',
    alignItems: 'center',
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginForm;
