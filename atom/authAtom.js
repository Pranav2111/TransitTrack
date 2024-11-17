import {atom} from 'recoil';

export const jwt = atom({
  key: 'jwt',
  default: null,
});

export const user = atom({
  key: 'user',
  default: null,
});
