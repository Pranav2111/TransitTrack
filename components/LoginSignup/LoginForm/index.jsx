import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginForm = () => {
  const [formData, setFormData] = useState({userName: '', password: ''});
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleInput = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        navigation.navigate('home'), 1500;
      });
    }, 1000);
  };

  return (
    <View style={styles.loginBox}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={formData.userName}
        onChangeText={value => handleInput('userName', value)}
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
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 40,
    fontSize: 16,
  },
  button: {
    width: '80%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2399dd',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: '#5793c4',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LoginForm;
