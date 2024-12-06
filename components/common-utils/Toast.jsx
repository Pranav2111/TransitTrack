import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, Animated} from 'react-native';

const Toast = ({message, type, duration, onHide}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setTimeout(onHide, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, fadeAnim, onHide]);

  const getToastStyle = () => {
    switch (type) {
      case 'error':
        return {container: styles.error, text: styles.errorText};
      case 'warning':
        return {container: styles.warning, text: styles.warningText};
      default:
        return {container: styles.info, text: styles.infoText};
    }
  };

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        getToastStyle().container,
        {opacity: fadeAnim},
      ]}>
      <Text style={[styles.toastText, getToastStyle().text]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    padding: 15,
    borderRadius: 8,
    zIndex: 9999,
    backgroundColor: 'white',
    borderWidth: 2,
  },
  toastText: {
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    borderColor: 'red',
    backgroundColor: '#ffe4e4',
  },
  warning: {
    borderColor: 'orange',
    backgroundColor: '#fffae8',
  },
  info: {
    borderColor: '#338fda',
    backgroundColor: '#e6f4ff',
  },
  errorText: {
    color: 'red',
  },
  warningText: {
    color: 'orange',
  },
  infoText: {
    color: '#338fda',
  },
});

export default Toast;
