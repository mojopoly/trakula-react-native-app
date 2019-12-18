import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;

const getLocation = increment => {
  return {
    timestamp: 1000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altituteAccuracy: 5,
      altitude: 5,
      longitude: -79.390229 + increment * tenMetersWithDegrees,
      latitude: 43.638340 + increment * tenMetersWithDegrees,
    },
  };
};

let counter = 0;
setInterval (() => {
  Location.EventEmitter.emit ('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId (),
    location: getLocation (counter),
  });
  counter++;
}, 1000);
