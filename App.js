/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {
  Text,
  View,
  PermissionsAndroid,
  Image,
  Button,
  StyleSheet,
} from 'react-native';

const App = () => {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;
  const [data, setData] = useState({});

  useEffect(() => {
    requestCameraPermission();
  });

  const takePhoto = async () => {
    const photo = await camera.current.takePhoto({
      // flash: 'on',
    });
    setData(photo);
    console.log('erererrerer', data);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  if (device == null) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={camera}
        device={device}
        isActive={true}
        photo={true}
      />
      <Button title="Click Photo" onPress={() => takePhoto()} />
      {data && (
        <View>
          <Image source={{uri: 'file://' + data.path}} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
  camera: {
    width: 200,
    height: 200,
  },
  image: {
    height: 200,
    width: 200,
  },
});

export default App;
