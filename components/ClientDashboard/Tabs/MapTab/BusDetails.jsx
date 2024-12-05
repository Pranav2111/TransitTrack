import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBus,
  faPerson,
  faLocationArrow,
  faUserGroup,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BusDetails = ({busDetails}) => {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.sectionTitle}>Bus Details</Text>
      <View style={styles.detailItem}>
        <FontAwesomeIcon
          icon={faBus}
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.detailLabel}>Bus Number:</Text>
        <Text style={styles.detailValue}>{busDetails.bus_number}</Text>
      </View>
      <View style={styles.detailItem}>
        <FontAwesomeIcon
          icon={faPerson}
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.detailLabel}>Driver Name:</Text>
        <Text style={styles.detailValue}>{busDetails.driver_name}</Text>
      </View>
      <View style={styles.detailItem}>
        <FontAwesomeIcon
          icon={faLocationArrow}
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.detailLabel}>Origin:</Text>
        <Text style={styles.detailValue}>{busDetails.origin}</Text>
      </View>
      <View style={styles.detailItem}>
        <FontAwesomeIcon
          icon={faLocationDot}
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.detailLabel}>Destination:</Text>
        <Text style={styles.detailValue}>{busDetails.destination}</Text>
      </View>
      <View style={styles.detailItem}>
        <FontAwesomeIcon
          icon={faUserGroup}
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.detailLabel}>Available Seats:</Text>
        <Text style={styles.detailValue}>{busDetails.available_seats}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f4f4f4',
  },
  loaderContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  mapContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  mapText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});

export default BusDetails;
