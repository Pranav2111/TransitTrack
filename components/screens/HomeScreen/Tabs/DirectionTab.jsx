import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Dropdown from '../../../common-utils/Dropdown';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRightLeft} from '@fortawesome/free-solid-svg-icons';

const DirectionTab = () => {
  const options = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Grape',
    'Mango',
    'Orange',
  ];

  return (
    <View>
      <View style={styles.heroSection}>
        <View>
          <Text style={styles.titleQuestion}>Where do you</Text>
          <Text style={styles.titleQuestion}>want to go?</Text>
        </View>
        <View style={styles.searchField}>
          <Dropdown
            options={options}
            onOptionSelected={() => {}}
            placeholder={'Origin'}
          />
        </View>
        <FontAwesomeIcon icon={faRightLeft} style={styles.swap} />
        <View style={styles.searchField}>
          <Dropdown
            options={options}
            onOptionSelected={() => {}}
            placeholder={'Destination'}
          />
        </View>
      </View>
      <View style={styles.searchBody}>
        <Text>aaaaaaaaaaaaaaaaa</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleQuestion: {
    fontSize: 25,
    fontWeight: 500,
    marginBottom: 15,
    color: '#5e5e5e',
  },
  heroSection: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 100,
  },
  searchField: {
    width: '95%',
  },
  swap: {
    marginLeft: 160,
    transform: [{rotate: '90deg'}],
    color: 'gray',
  },
  searchBody: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 100,
    marginTop: 10,
    minHeight: 'auto',
  },
});

export default DirectionTab;
