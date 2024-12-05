import Geolocation from 'react-native-geolocation-service';

let lastPosition = null;
const radiusThreshold = 2; // 5 meters

function getDistance(lat1, lon1, lat2, lon2) {
  const toRadians = deg => deg * (Math.PI / 180);
  const R = 6371e3; // Earth's radius in meters
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

export const fetchAndFeedCurrentLocation = feedBusPath => {
  Geolocation.watchPosition(
    position => {
      const {latitude, longitude} = position.coords;

      if (lastPosition) {
        const distance = getDistance(
          lastPosition.latitude,
          lastPosition.longitude,
          latitude,
          longitude,
        );

        if (distance > radiusThreshold) {
          console.log(
            `Moved by ${distance} meters. New location: ${latitude}, ${longitude}`,
          );
          // feedBusPath([longitude, latitude]);
          lastPosition = {latitude, longitude};
        } else {
          console.log('Location is within the 5-meter threshold.');
        }
      } else {
        lastPosition = {latitude, longitude};
        console.log(`Initial location: ${latitude}, ${longitude}`);
        // feedBusPath([longitude, latitude]);
      }
    },
    error => {
      console.error('Error getting location:', error);
    },
    {
      interval: 3000,
      timeout: 20000,
      maximumAge: 1000,
      showsBackgroundLocationIndicator: true,
      enableHighAccuracy: true,
      showLocationDialog: true,
      forceRequestLocation: true,
      forceLocationManager: true,
    },
  );
};
