import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'We need access to your location to show it on the map.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission denied');
      return;
    }
  } catch (err) {
    console.warn(err);
  }
};

export const getLocation = setUserLocation => {
  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      setUserLocation([longitude, latitude]);
    },
    error => {
      console.log('Location error: ', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    },
  );
};
