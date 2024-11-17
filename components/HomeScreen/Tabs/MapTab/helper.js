export const recenterToPath = (cameraRef, path) => {
  if (cameraRef.current && path.length > 0) {
    const firstLocation = path[0];
    const lastLocation = path[path.length - 1];

    const centerCoordinates = [
      (firstLocation[0] + lastLocation[0]) / 2,
      (firstLocation[1] + lastLocation[1]) / 2,
    ];

    cameraRef.current.setCamera({
      centerCoordinate: centerCoordinates,
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
