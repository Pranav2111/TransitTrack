import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {busData, routeSearch} from '../../../../../atom/busDataAtom';
import {tabNavigator} from '../../../../../atom/tabNavigator';

const busList = [
  {
    busNumber: 'MH-89-2121',
    timing: '11:00 AM - 03:00 PM',
    spec: 'Non AC',
    seatsAvailable: 32,
  },
  {
    busNumber: 'MH-99-4242',
    timing: '02:00 PM - 06:00 PM',
    spec: 'AC',
    seatsAvailable: 18,
  },
  {
    busNumber: 'MH-77-5656',
    timing: '05:00 AM - 09:00 AM',
    spec: 'Non AC',
    seatsAvailable: 45,
  },
  {
    busNumber: 'MH-88-3344',
    timing: '06:00 AM - 10:00 AM',
    spec: 'AC',
    seatsAvailable: 25,
  },
  {
    busNumber: 'MH-55-1010',
    timing: '08:00 AM - 12:00 PM',
    spec: 'Non AC',
    seatsAvailable: 30,
  },
  {
    busNumber: 'MH-44-3030',
    timing: '12:00 PM - 04:00 PM',
    spec: 'AC',
    seatsAvailable: 20,
  },
  {
    busNumber: 'MH-66-7070',
    timing: '01:00 PM - 05:00 PM',
    spec: 'Non AC',
    seatsAvailable: 40,
  },
  {
    busNumber: 'MH-22-9090',
    timing: '04:00 PM - 08:00 PM',
    spec: 'AC',
    seatsAvailable: 15,
  },
  {
    busNumber: 'MH-33-1212',
    timing: '07:00 AM - 11:00 AM',
    spec: 'Non AC',
    seatsAvailable: 50,
  },
  {
    busNumber: 'MH-11-2020',
    timing: '09:00 AM - 01:00 PM',
    spec: 'AC',
    seatsAvailable: 22,
  },
];

const SearchBodySection = () => {
  const [busDetails, setBusDetails] = useRecoilState(busData);
  const [_, setActiveNavItem] = useRecoilState(tabNavigator);

  const {origin, destination} = useRecoilValue(routeSearch) || {};

  const handleBusSelect = busNumber => {
    setBusDetails({
      ...busDetails,
      busNumber,
      isLoading: true,
    });
    setTimeout(() => {
      setActiveNavItem('map');
    }, 10);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Bus Schedules: &nbsp;
        <Text style={styles.titleName}>{origin?.label} </Text>-
        <Text style={styles.titleName}> {destination?.label}</Text>
      </Text>
      {busList.map((bus, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cardContainer}
          onPress={() => handleBusSelect(bus.busNumber)}>
          <View style={styles.leftSection}>
            <Text style={styles.busName}>{bus.busNumber}</Text>
            <Text style={styles.busTiming}>{bus.timing}</Text>
          </View>
          <View style={styles.rightSection}>
            <Text
              style={[
                styles.busSpec,
                bus.spec === 'AC' ? styles.acSpec : styles.nonAcSpec,
              ]}>
              {bus.spec}
            </Text>
            <Text style={styles.seats}>
              {bus.seatsAvailable} Seats Available
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
    fontSize: 15,
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
});

export default SearchBodySection;
