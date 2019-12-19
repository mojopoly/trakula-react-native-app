import {useState, useEffect} from 'react';

//import '../_mockLocation';
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from 'expo-location';
import * as Permissions from 'expo-permissions';

export default (shouldTrack, callback) => {
  const [err, setErr] = useState (null);

  useEffect (
    () => {
      let subscriber;
      const startWatching = async () => {
        try {
          const response = await Permissions.askAsync (Permissions.LOCATION);
          setErr (response.status);
          subscriber = await watchPositionAsync (
            {
              accuracy: Accuracy.BestForNavigation,
              timeInterval: 1000,
              distanceInterval: 10,
            },
            callback
          );
        } catch (e) {
          setErr (e);
        }
      };
      if (shouldTrack) {
        startWatching ();
      } else {
        if (subscriber) {
          subscriber.remove ();
        }
        subscriber = null;
      }
      return () => {
        if (subscriber) {
          subscriber.remove ();
        }
      };
    },
    [shouldTrack, callback]
  );

  return [err];
};
