/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Map from './MapTab/Map';
import BusDetails from './MapTab/BusDetails';
import {useRecoilState, useRecoilValue} from 'recoil';
import {busData} from '../../../atom/busDataAtom';
import axios from 'axios';
import {jwt} from '../../../atom/authAtom';

let refreshInterval;
const MapTab = () => {
  const [path, setPath] = useState([]);
  const [busDetails, _] = useRecoilState(busData);

  const token = useRecoilValue(jwt);

  const {path: busRoute} = busDetails || {};

  const handleGetBusPath = bus_number =>
    axios.get(
      `http://192.168.0.100:5000/api/bus/bus-path?bus_number=${bus_number}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

  const refreshBusPath = async () => {
    const response = await handleGetBusPath(busDetails.details.busNumber);
    const busPath = response.data.path;

    console.log('==================>', busPath);
    if (!busPath.length) {
      return;
    }

    setPath(busPath);
  };

  useEffect(() => {
    refreshInterval = setInterval(() => {
      refreshBusPath();
    }, 1000 * 5);

    setPath(busRoute);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <View style={styles.page}>
      {busDetails?.details?.bus_number && (
        <BusDetails busDetails={busDetails?.details} />
      )}

      <Map path={path} />
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
