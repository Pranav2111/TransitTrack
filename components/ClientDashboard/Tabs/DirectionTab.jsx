import React from 'react';
import {StyleSheet, View} from 'react-native';
import SearchBodySection from './DirectionTab/SearchBodySection';
import HeroSection from './DirectionTab/HeroSection';

const DirectionTab = () => {
  return (
    <View style={styles.container}>
      <HeroSection />
      <SearchBodySection />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default DirectionTab;
