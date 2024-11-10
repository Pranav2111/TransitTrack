import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import NavigationBar from './NavigationBar';
import TitleBar from './TitleBar';
import Dropdown from '../../common-utils/Dropdown';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRightLeft} from '@fortawesome/free-solid-svg-icons';

const HomeScreen = () => {
  const [activeNavItem, setActiveNavItem] = useState('direction');
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
    <ScrollView>
      <View style={styles.homeScreenContainer}>
        <NavigationBar
          activeNavItem={activeNavItem}
          setActiveNavItem={setActiveNavItem}
        />

        <TitleBar />

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeScreenContainer: {
    width: '100%',
    minHeight: '100%',
    flex: 1,
    position: 'relative',
    backgroundColor: '#f8fcff',
    paddingHorizontal: 10,
  },
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

export default HomeScreen;
