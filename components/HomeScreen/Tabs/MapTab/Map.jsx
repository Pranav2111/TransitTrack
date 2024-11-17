/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCrosshairs} from '@fortawesome/free-solid-svg-icons';
import {recenterToPath, recenterToUserLocation} from './helper';
import {useRecoilValue} from 'recoil';
import {currentLocation} from '../../../../atom/location';

Mapbox.setAccessToken(
  'sk.eyJ1IjoicGF0aWxwcmFuYXYyMSIsImEiOiJjbTNqM3FsbGgwOGhlMmpyMjE5Y2lkcG85In0.3iLLMA0SaUvjZIH9hMb0JQ',
);

const mapHeight = Dimensions.get('window').height;

const Map = ({path}) => {
  const userLocation = useRecoilValue(currentLocation);

  const cameraRef = useRef(null);

  const recenter = () => {
    if (path.length) {
      recenterToPath(cameraRef, path);
    } else {
      recenterToUserLocation(cameraRef, userLocation);
    }
  };

  const geoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: path,
        },
      },
    ],
  };

  useEffect(() => {
    if (cameraRef.current) {
      recenter();
    }
  }, [path, userLocation]);

  return (
    <View style={{flex: 1}}>
      <Mapbox.MapView
        style={[styles.map, {height: mapHeight - 150}]}
        zoomEnabled
        pitchEnabled
        scrollEnabled
        onDidFinishLoadingMap={recenter}>
        <Mapbox.Camera ref={cameraRef} />

        <Mapbox.PointAnnotation id="user-location" coordinate={userLocation}>
          <View style={styles.marker} />
        </Mapbox.PointAnnotation>

        {path.length > 0 && (
          <Mapbox.ShapeSource id="route" shape={geoJSON}>
            <Mapbox.LineLayer
              id="route-line"
              style={{lineColor: '#007aff', lineWidth: 4}}
            />
          </Mapbox.ShapeSource>
        )}
      </Mapbox.MapView>

      <TouchableOpacity
        style={styles.recenterButtonContainer}
        onPress={recenter}>
        <FontAwesomeIcon icon={faCrosshairs} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
  },
  marker: {
    backgroundColor: '#007aff',
    height: 25,
    width: 25,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#9b9b9b',
  },

  recenterButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 111,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#272727',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Map;
