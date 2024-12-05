/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  faBus,
  faLocationArrow,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import {useRecoilValue} from 'recoil';
import {jwt} from '../../../atom/authAtom';
import {formatDate} from '../../common-utils/commonMethods';
import {fetchAndFeedCurrentLocation} from './helper';

let locationTracking;
const HeroSection = () => {
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);
  const [busDetails, setBusDetails] = useState({});

  const token = useRecoilValue(jwt);
  const feedBusPath = coord => {
    axios
      .post(
        'http://192.168.0.103:5000/api/driver/bus/feed-bus-route',
        {
          path: [coord],
          bus_number: 'MH-75-6456',
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .catch(err => {
        console.log('------------>', err);
      });
  };

  const startJourney = () => {
    setIsJourneyStarted(true);
    fetchAndFeedCurrentLocation(feedBusPath);
  };

  const endJourney = () => {
    setIsJourneyStarted(false);
    clearInterval(locationTracking);
  };

  const getBusData = async () => {
    axios
      .get('http://192.168.0.103:5000/api/driver/driver-schedule', {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        setBusDetails(res.data?.current_schedule);
      })
      .catch(err => {
        console.log('------------>', err);
      });
  };

  useEffect(() => {
    getBusData();
  }, []);

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
          <Text style={styles.time}>
            {' '}
            - {formatDate(busDetails.start_time)}
          </Text>
        </Text>
        <Text style={styles.detail}>
          <FontAwesomeIcon icon={faLocationArrow} style={styles.icon} />
          &nbsp;&nbsp;{busDetails.destination}
          <Text style={styles.time}> - {formatDate(busDetails.end_time)}</Text>
        </Text>
      </View>

      <View style={styles.controlPanel}>
        <TouchableOpacity
          style={[
            styles.button,
            isJourneyStarted ? styles.disabledButton : styles.activeButton,
          ]}
          onPress={startJourney}>
          {isJourneyStarted && <ActivityIndicator color="#fff" />}
          <Text style={styles.startText}>
            &nbsp;
            {isJourneyStarted ? 'Tracking...' : 'Start Journey'}
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
    flexDirection: 'row',
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
