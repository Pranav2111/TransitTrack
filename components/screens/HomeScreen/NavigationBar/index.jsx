import React from 'react';
import {faGlobe, faRoute, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const NavigationBar = ({activeNavItem, setActiveNavItem}) => {
  const isDirectionTab = activeNavItem === 'direction';
  const isMapTab = activeNavItem === 'map';
  const isProfileTab = activeNavItem === 'profile';

  const handleNavigation = item => {
    setActiveNavItem(item);
  };

  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity
        style={[styles.navigationButton, isDirectionTab && styles.activeButton]}
        onPress={() => handleNavigation('direction')}>
        <FontAwesomeIcon
          icon={faRoute}
          size={20}
          color={isDirectionTab ? '#006eff' : '#8f8f8f'}
        />
        <Text style={[styles.text, isDirectionTab && styles.activeText]}>
          Directions
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navigationButton, isMapTab && styles.activeButton]}
        onPress={() => handleNavigation('map')}>
        <FontAwesomeIcon
          icon={faGlobe}
          size={20}
          color={isMapTab ? '#006eff' : '#8f8f8f'}
        />
        <Text style={[styles.text, isMapTab && styles.activeText]}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navigationButton, isProfileTab && styles.activeButton]}
        onPress={() => handleNavigation('profile')}>
        <FontAwesomeIcon
          icon={faUser}
          size={20}
          color={isProfileTab ? '#006eff' : '#8f8f8f'}
        />
        <Text style={[styles.text, isProfileTab && styles.activeText]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    position: 'absolute',
    zIndex: 100,
    width: 300,
    height: 80,
    bottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    elevation: 100, // This applies shadow on Android
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.055)',
    overflow: 'hidden',
  },
  navigationButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: '100%',
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: 'rgba(0, 110, 255, 0.1)', // Light blue background for active item
    borderRadius: 10,
  },
  text: {
    color: '#8f8f8f',
  },
  activeText: {
    color: '#006eff', // Blue text for active item
  },
});

export default NavigationBar;
