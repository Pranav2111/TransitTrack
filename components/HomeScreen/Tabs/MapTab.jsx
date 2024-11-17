/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Map from './MapTab/Map';
import BusDetails from './MapTab/BusDetails';
import {useRecoilState, useRecoilValue} from 'recoil';
import {busData} from '../../../atom/busDataAtom';
import {currentLocation} from '../../../atom/location';

const MapTab = () => {
  const [busDetails, setBusDetails] = useRecoilState(busData);

  const userLocation = useRecoilValue(currentLocation);

  const {isLoading, busNumber} = busDetails || {};

  useEffect(() => {
    if (busNumber && !isLoading) {
      setTimeout(() => {
        setBusDetails({
          isLoading: false,
          busNumber: busDetails.busNumber,
          details: busDetails,
          busRouteData: {},
        });
      }, 3000);
    }
  }, [isLoading, busNumber]);

  const nashikToPunePath = [
    [73.7844, 19.9975],
    [73.8532, 19.8532],
    [74.0616, 19.6365],
    [74.2671, 18.5186],
  ];

  return (
    <View style={styles.page}>
      {busDetails?.details?.busNumber && (
        <BusDetails busDetails={busDetails?.details} />
      )}

      <Map currentLocation={userLocation} path={nashikToPunePath} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#d6d6d6',
  },
});

export default MapTab;
