import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import '../_mockLocation';
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from 'expo-location';
import Map from '../components/Map';
import * as Permissions from 'expo-permissions';

const TrackCreateScreen = () => {
  const [err, setErr] = useState (null);
  //console.log(err);
  const startWatching = async () => {
    try {
      const response = await Permissions.askAsync (Permissions.LOCATION);
      setErr (response.status);
      await watchPositionAsync (
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        location => {
          //console.log (location);
        }
      );
    } catch (e) {
      console.log ('e');
      setErr (e);
    }
  };

  useEffect (() => {
    startWatching ();
  }, []);

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text h2>Create a Track</Text>
      <Map />
      {err === 'denied' ? <Text>Please enable location services</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create ({});

export default TrackCreateScreen;
