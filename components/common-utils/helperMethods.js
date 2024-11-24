export const recenterToPath = (cameraRef, path) => {
  if (cameraRef.current && path.length > 0) {
    const lastLocation = path[path.length - 1];

    cameraRef.current.setCamera({
      centerCoordinate: [lastLocation[0], lastLocation[1]],
      zoomLevel: 7,
      animationDuration: 2000,
    });
  }
};

export const recenterToUserLocation = (cameraRef, userLocation) => {
  cameraRef.current.setCamera({
    centerCoordinate: userLocation,
    zoomLevel: 7,
    animationDuration: 2000,
  });
};
