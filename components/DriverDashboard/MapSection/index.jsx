import {StyleSheet, View} from 'react-native';
import Map from './Map';
import React from 'react';

const MapSection = () => {
  return (
    <View style={styles.container}>
      <Map
        path={[
          [74.3312, 21.451],
          [73.3312, 20.451],
          [73.11, 18.11],
        ]}
        originLocation={[74.3312, 21.451]}
        destinationLocation={[73.8567, 18.5204]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500,
  },
  map: {
    width: '100%',
  },
});

export default MapSection;
