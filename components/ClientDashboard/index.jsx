import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import NavigationBar from './NavigationBar';
import TitleBar from '../common-utils/TitleBar';
import DirectionTab from './Tabs/DirectionTab';
import MapTab from './Tabs/MapTab';
import ProfileTab from './Tabs/ProfileTab';
import {useRecoilState} from 'recoil';
import {tabNavigator} from '../../atom/tabNavigator';

const ClientDashboard = () => {
  const [activeNavItem, setActiveNavItem] = useRecoilState(tabNavigator);

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
  navigationBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

export default ClientDashboard;
