import {atom} from 'recoil';

export const routeSearch = atom({
  key: 'routeSearch',
  default: {origin: null, destination: null},
});

export const busData = atom({
  key: 'busData',
  default: {
    isLoading: false,
    busNumber: null,
    details: {},
    busRouteData: {},
  },
});
