import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {busData, routeSearch} from '../../../../../atom/busDataAtom';
import {tabNavigator} from '../../../../../atom/tabNavigator';
import axios from 'axios';
import {jwt} from '../../../../../atom/authAtom';

const formatTime = date => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// Main method to get the formatted time range
const getFormattedTimeRange = (start_date, end_date) => {
  const startTime = formatTime(start_date);
  const endTime = formatTime(end_date);

  return `${startTime} - ${endTime}`;
};

const SearchBodySection = () => {
  const [busDetails, setBusDetails] = useRecoilState(busData);
  const [_, setActiveNavItem] = useRecoilState(tabNavigator);

  const token = useRecoilValue(jwt);
  const {origin, destination, routes} = useRecoilValue(routeSearch) || {};

  const isDataSearched = !!origin && !!destination;
  const routesAvailable = !!routes.length;

  const handleGetBusPath = bus_number =>
    axios.get(
      `http://192.168.0.103:5000/api/bus/bus-path?bus_number=${bus_number}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

  const handleBusSelect = async bus => {
    const response = await handleGetBusPath(bus.busNumber);
    const busPath = response.data.path;

    if (!busPath.length) {
      return;
    }

    setBusDetails({
      ...busDetails,
      details: bus,
      path: busPath,
      isLoading: true,
    });

    setTimeout(() => {
      setActiveNavItem('map');
    }, 10);
  };

  if (!isDataSearched) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.searchText}>Search for getting routes!</Text>-
        <Image
          resizeMode="contain"
          source={require('../../../../../assets/search-bg.png')}
          style={styles.searchBg}
        />
      </ScrollView>
    );
  }

  if (!routesAvailable) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.noBusesText}>
          No buses found from {origin} to {destination}
        </Text>
        -
        <Image
          resizeMode="contain"
          source={require('../../../../../assets/search-bg.png')}
          style={styles.searchBg}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Bus Schedules: &nbsp;
        <Text style={styles.titleName}>{origin} </Text>-
        <Text style={styles.titleName}> {destination}</Text>
      </Text>
      {routes.map((bus, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cardContainer}
          onPress={() => handleBusSelect(bus)}>
          <View style={styles.leftSection}>
            <Text style={styles.busName}>{bus.busNumber}</Text>
            <Text style={styles.busTiming}>
              {getFormattedTimeRange(bus.start_time, bus.end_time)}
            </Text>
          </View>
          <View style={styles.rightSection}>
            <Text
              style={[
                styles.busSpec,
                bus.ac_type === 'AC' ? styles.acSpec : styles.nonAcSpec,
              ]}>
              {bus.ac_type}
            </Text>
            <Text style={[styles.seats, !bus.availableSeats && styles.noSeat]}>
              {bus.availableSeats || 0} Seats Available
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    paddingBottom: 100,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginTop: 15,
    minHeight: 'auto',
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    display: 'flex',
    justifyContent: 'center',
  },
  titleName: {
    fontSize: 16,
    color: '#969696',
  },
  cardContainer: {
    padding: 15,
    borderRadius: 10,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  leftSection: {
    flex: 1,
    paddingRight: 10,
  },
  rightSection: {
    flex: 1,
    paddingLeft: 10,
    alignItems: 'flex-end',
  },
  busName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 5,
  },
  busTiming: {
    fontSize: 14,
    color: '#777',
  },
  busSpec: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  acSpec: {
    color: '#2196F3',
  },
  nonAcSpec: {
    color: '#FF9800',
  },
  seats: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  noSeat: {
    color: '#e70000',
  },
  searchText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#969696',
    fontWeight: 500,
  },
  searchBg: {
    width: '100%',
    height: 250,
  },
  noBusesText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ff7272',
    fontWeight: 500,
  },
});

export default SearchBodySection;
