/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Map from './MapTab/Map';
import BusDetails from './MapTab/BusDetails';
import {useRecoilState, useRecoilValue} from 'recoil';
import {busData} from '../../../atom/busDataAtom';
import axios from 'axios';
import {jwt} from '../../../atom/authAtom';

let refreshInterval;
const MapTab = () => {
  const [busDetails, setBusDetails] = useRecoilState(busData);

  const token = useRecoilValue(jwt);

  const {path} = busDetails || {};

  const handleGetBusPath = bus_number =>
    axios.get(
      `http://192.168.0.103:5000/api/bus/bus-path?bus_number=${bus_number}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

  const refreshBusPath = async () => {
    const response = await handleGetBusPath(busDetails.details.busNumber);
    const busPath = response.data.path;

    if (!busPath.length) {
      return;
    }

    const updateBusDetails = {
      ...busDetails,
      path: busPath,
    };

    setBusDetails(updateBusDetails);
  };

  useEffect(() => {
    refreshInterval = setInterval(() => {
      refreshBusPath();
    }, 1000 * 15);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <View style={styles.page}>
      {busDetails?.details?.bus_number && (
        <BusDetails busDetails={busDetails?.details} />
      )}

      <Map
        path={path}
        busLocation={path.length > 0 ? path[path.length - 1] : null}
      />
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
