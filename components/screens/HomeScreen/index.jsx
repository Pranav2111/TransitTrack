import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import NavigationBar from './NavigationBar';
import TitleBar from './TitleBar';
import DirectionTab from './Tabs/DirectionTab';
import MapTab from './Tabs/MapTab';
import ProfileTab from './Tabs/ProfileTab';

const HomeScreen = () => {
  const [activeNavItem, setActiveNavItem] = useState('direction');

  const isMapTabActive = activeNavItem === 'map';
  const isDirectionTabActive = activeNavItem === 'direction';
  const isProfileTabActive = activeNavItem === 'profile';

  return (
    <ScrollView>
      <View style={styles.homeScreenContainer}>
        <TitleBar />
        <NavigationBar
          isMapTabActive={isMapTabActive}
          isDirectionTabActive={isDirectionTabActive}
          isProfileTabActive={isProfileTabActive}
          setActiveNavItem={setActiveNavItem}
        />

        {isDirectionTabActive && <DirectionTab />}
        {isMapTabActive && <MapTab />}
        {isProfileTabActive && <ProfileTab />}
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
