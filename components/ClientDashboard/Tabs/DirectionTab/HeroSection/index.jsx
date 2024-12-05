/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getGreeting} from './helper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRightLeft} from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../../../../../components/common-utils/Dropdown';
import {routeSearch} from '../../../../../atom/busDataAtom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {jwt, user} from '../../../../../atom/authAtom';
import axios from 'axios';
import {busStops} from '../../../../../atom/formRequisite';
import {toTitleCase} from '../../../../common-utils/commonMethods';

const HeroSection = () => {
  const userData = useRecoilValue(user);
  const token = useRecoilValue(jwt);

  const [_, setRoute] = useRecoilState(routeSearch);
  const [options, setOptions] = useRecoilState(busStops);

  const [formValues, setFormValues] = useState({
    origin: '',
    destination: '',
  });

  const isButtonDisabled = !formValues?.origin || !formValues?.destination;
  const greetText = getGreeting();

  const handleOptionSelect = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    axios
      .get(
        `http://192.168.0.103:5000/api/client/bus/scheduled-buses?originId=${formValues.origin.value}&destinationId=${formValues.destination.value}`,
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then(res => {
        setRoute({
          origin: formValues.origin.label,
          destination: formValues.destination.label,
          routes: res.data.schedules,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (options.length) {
      return;
    }
    axios
      .get('http://192.168.0.103:5000/api/form-requisite/bus-stops', {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        setOptions(res.data);
      });
  }, []);

  return (
    <View style={styles.heroSection}>
      <View style={styles.greetSection}>
        <Text style={styles.greetText}>{greetText}</Text>
        <Text style={styles.name}>{toTitleCase(userData?.name) || 'User'}</Text>

        <Text style={styles.titleQuestion}>Where do you</Text>
        <Text style={styles.titleQuestion}>want to go?</Text>

        <Image
          source={require('../../../../../assets/bg.png')}
          style={styles.bg}
        />
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
        disabled={isButtonDisabled}
        style={[styles.submitButton, isButtonDisabled && styles.disabledButton]}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {false ? 'Searching...' : 'Search Buses'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  greetSection: {
    position: 'relative',
    height: 115,
    marginBottom: 35,
  },
  greetText: {
    fontSize: 25,
    color: '#3d474d',
    fontWeight: 500,
  },
  name: {
    fontSize: 25,
    color: '#4699c9',
    fontWeight: 500,
    marginBottom: 10,
  },
  bg: {
    position: 'absolute',
    right: 0,
    width: 160,
    resizeMode: 'contain',
    bottom: -50,
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
    backgroundColor: '#3b678a',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 600,
    color: 'white',
  },
});

export default HeroSection;
