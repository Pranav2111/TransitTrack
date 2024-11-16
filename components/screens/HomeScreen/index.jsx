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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TitleBar />
        {isDirectionTabActive && <DirectionTab />}
        {isMapTabActive && <MapTab />}
        {isProfileTabActive && <ProfileTab />}
      </ScrollView>

      <View style={styles.navigationBarContainer}>
        <NavigationBar
          isMapTabActive={isMapTabActive}
          isDirectionTabActive={isDirectionTabActive}
          isProfileTabActive={isProfileTabActive}
          setActiveNavItem={setActiveNavItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f8fcff',
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  navigationBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

export default HomeScreen;
