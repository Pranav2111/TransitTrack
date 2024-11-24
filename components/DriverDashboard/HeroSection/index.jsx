import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  faBus,
  faLocationArrow,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const HeroSection = () => {
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);

  const busDetails = {
    bus_number: null,
    origin: 'Mumbai',
    destination: 'Pune',
    origin_time: '01 May 2024 09:00 AM',
    destination_time: '01 May 2024 11:30 PM',
  };

  const startJourney = () => {
    setIsJourneyStarted(true);
  };

  const endJourney = () => {
    setIsJourneyStarted(false);
  };

  if (!busDetails.bus_number) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>No upcoming journey!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Current Journey</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>
          <FontAwesomeIcon icon={faBus} style={styles.icon} />
          &nbsp;&nbsp;{busDetails.bus_number}
        </Text>
        <Text style={styles.detail}>
          <FontAwesomeIcon icon={faLocationDot} style={styles.icon} />
          &nbsp;&nbsp;{busDetails.origin}
          <Text style={styles.time}> - {busDetails.origin_time}</Text>
        </Text>
        <Text style={styles.detail}>
          <FontAwesomeIcon icon={faLocationArrow} style={styles.icon} />
          &nbsp;&nbsp;{busDetails.destination}
          <Text style={styles.time}> - {busDetails.destination_time}</Text>
        </Text>
      </View>

      <View style={styles.controlPanel}>
        <TouchableOpacity
          style={[
            styles.button,
            isJourneyStarted ? styles.disabledButton : styles.activeButton,
          ]}
          onPress={startJourney}>
          <Text style={styles.startText}>
            {isJourneyStarted ? 'Journey Started...' : 'Start Journey'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            isJourneyStarted ? styles.activeButton : styles.disabledButton,
          ]}
          onPress={endJourney}>
          <Text style={styles.endText}>Mark Completed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: 8,
    elevation: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7c7c7c',
    marginBottom: 10,
  },
  detailsContainer: {
    marginVertical: 10,
  },
  detail: {
    fontSize: 15,
    fontWeight: '400',
    color: '#666',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#4a90e2',
  },
  time: {
    fontSize: 15,
    fontWeight: '400',
    color: '#999',
    marginLeft: 10,
  },
  controlPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#4a90e2',
  },
  disabledButton: {
    backgroundColor: '#b0c4de',
  },
  startText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  endText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default HeroSection;
