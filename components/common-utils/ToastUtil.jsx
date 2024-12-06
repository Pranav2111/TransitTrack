// ToastUtil.js
import {useState, useCallback} from 'react';
import Toast from './Toast';

let showToast = null;
let toastTimeout = null;

export const useToast = () => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('info');
  const [duration, setDuration] = useState(3000);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const show = useCallback(
    (msg, msgType = 'info', duration = 3000) => {
      if (isToastVisible) {
        clearTimeout(toastTimeout);
        setIsToastVisible(false);
      }

      setMessage(msg);
      setType(msgType);
      setDuration(duration);
      setIsToastVisible(true);

      toastTimeout = setTimeout(() => {
        setIsToastVisible(false);
      }, duration);
    },
    [isToastVisible],
  );

  const ToastComponent = isToastVisible ? (
    <Toast
      message={message}
      type={type}
      duration={duration}
      onHide={() => setIsToastVisible(false)}
    />
  ) : null;

  return {
    triggerToast: show,
    ToastComponent,
  };
};

export const triggerToast = (msg, msgType = 'info', duration = 3000) => {
  if (showToast) {
    showToast(msg, msgType, duration);
  }
};
