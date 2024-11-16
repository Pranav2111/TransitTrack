import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getGreeting} from './helper';
import Dropdown from '../../../../../common-utils/Dropdown';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRightLeft} from '@fortawesome/free-solid-svg-icons';

const HeroSection = ({formValues, isLoading, setFormValues, setIsLoading}) => {
  const isButtonDisabled =
    !formValues?.origin || !formValues?.destination || isLoading;

  const greetText = getGreeting();

  const options = [
    {label: 'Mumbai (BOM)', value: 'bom'},
    {label: 'Pune (PNQ)', value: 'pnq'},
    {label: 'Nagpur (NAG)', value: 'nag'},
    {label: 'Nashik (ISK)', value: 'isk'},
    {label: 'Aurangabad (IXU)', value: 'ixu'},
    {label: 'Thane (THN)', value: 'thn'},
    {label: 'Solapur (SSE)', value: 'sse'},
    {label: 'Kolhapur (KLH)', value: 'klh'},
    {label: 'Satara (SRT)', value: 'srt'},
    {label: 'Chandrapur (CDP)', value: 'cdp'},
    {label: 'Jalgaon (JAL)', value: 'jal'},
    {label: 'Kalyan (KYN)', value: 'kyn'},
    {label: 'Vasai (VSI)', value: 'vsi'},
    {label: 'Akola (AKO)', value: 'ako'},
    {label: 'Amravati (AMR)', value: 'amr'},
  ];

  const handleOptionSelect = (field, value) => {
    setFormValues({...formValues, [field]: value});
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.heroSection}>
      <View style={styles.greetSection}>
        <Text style={styles.greetText}>{greetText}</Text>
        <Text style={styles.name}>Pranav</Text>
        <Image
          source={require('../../../../../assets/bg.png')}
          style={styles.bg}
        />
      </View>
      <View>
        <Text style={styles.titleQuestion}>Where do you</Text>
        <Text style={styles.titleQuestion}>want to go?</Text>
      </View>
      <View style={styles.searchField}>
        <Dropdown
          options={options}
          onOptionSelected={value => handleOptionSelect('origin', value)}
          placeholder={'Enter the origin'}
        />
      </View>
      <View style={styles.searchField}>
        <FontAwesomeIcon icon={faRightLeft} style={styles.swap} />
      </View>
      <View style={styles.searchField}>
        <Dropdown
          options={options}
          onOptionSelected={value => handleOptionSelect('destination', value)}
          placeholder={'Enter the destination'}
        />
      </View>
      <TouchableOpacity
        style={[styles.submitButton, isButtonDisabled && styles.disabledButton]}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Searching...' : 'Search Buses'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  greetSection: {
    position: 'relative',
    height: 115,
    marginBottom: -30,
  },
  greetText: {
    fontSize: 25,
    color: '#3d474d',
    fontWeight: 500,
  },
  name: {
    fontSize: 25,
    color: '#4699c9',
    fontWeight: 400,
  },
  bg: {
    position: 'absolute',
    right: 0,
    width: 150,
    resizeMode: 'contain',
    bottom: -60,
  },
  titleQuestion: {
    fontSize: 20,
    fontWeight: '500',
    color: '#a7a7a7',
  },
  heroSection: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 100,
  },
  searchField: {
    width: 'auto',
  },
  swap: {
    alignSelf: 'center',
    transform: [{rotate: '90deg'}],
    color: 'gray',
  },
  submitButton: {
    width: 'auto',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4699c9',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#5793c4',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 600,
    color: 'white',
  },
});

export default HeroSection;
