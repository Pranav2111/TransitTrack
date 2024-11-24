import {ScrollView, StyleSheet, View} from 'react-native';
import TitleBar from '../common-utils/TitleBar';
import React from 'react';
import HeroSection from './HeroSection';
import MapSection from './MapSection';

const DriverDashboard = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TitleBar />
        <HeroSection />
        <MapSection />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
});

export default DriverDashboard;
