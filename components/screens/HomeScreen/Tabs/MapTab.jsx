import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  PermissionsAndroid,
  Platform,
  Dimensions,
} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';

Mapbox.setAccessToken(
  'sk.eyJ1IjoicGF0aWxwcmFuYXYyMSIsImEiOiJjbTNqM3FsbGgwOGhlMmpyMjE5Y2lkcG85In0.3iLLMA0SaUvjZIH9hMb0JQ',
);

const MapTab = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const cameraRef = useRef(null);
  const mapHeight = Dimensions.get('window').height;

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission().then(() => {
        getLocation();
      });
    } else {
      getLocation();
    }
  }, []);

  const requestLocationPermission = async () => {
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

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
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

  const handleMapReady = () => {
    if (currentLocation && cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: [currentLocation.longitude, currentLocation.latitude],
        zoomLevel: 12,
        animationDuration: 2000,
      });
    }
  };

  return (
    <View style={styles.page}>
      {currentLocation ? (
        <>
          <Button
            title="Recenter to My Location"
            color={'#4699c9'}
            onPress={handleMapReady}
          />

          <Mapbox.MapView
            style={[styles.map, {height: mapHeight - 190}]}
            zoomEnabled
            pitchEnabled
            scrollEnabled
            onDidFinishLoadingMap={handleMapReady}>
            <Mapbox.Camera ref={cameraRef} />
            <Mapbox.PointAnnotation
              id="user-location"
              coordinate={[
                currentLocation.longitude,
                currentLocation.latitude,
              ]}>
              <View style={styles.marker}>
                <Text style={styles.markerText}>📍</Text>
              </View>
            </Mapbox.PointAnnotation>
          </Mapbox.MapView>
        </>
      ) : (
        <Text>Loading location...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  map: {
    width: '100%',
  },
  marker: {
    backgroundColor: 'transparent',
  },
  markerText: {
    fontSize: 24,
  },
});

export default MapTab;
