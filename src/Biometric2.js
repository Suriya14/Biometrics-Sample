import React from 'react';
import {
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

async function verifyIfSensorIsAvailable() {
  const {biometryType, available} =
    await ReactNativeBiometrics.isSensorAvailable();

  if (
    available &&
    (biometryType === ReactNativeBiometrics.Biometrics ||
      biometryType === ReactNativeBiometrics.TouchID ||
      biometryType === ReactNativeBiometrics.FaceID)
  ) {
    return true;
  }
  return false;
}

async function createKey() {
  try {
    const {publicKey} = await ReactNativeBiometrics.createKeys();
    return publicKey || '';
  } catch (error) {
    console.error('Biometric Erro CreateKeys:', error);
  }
}

async function sendKeyToBackEnd() {
  if (verifyIfSensorIsAvailable()) {
    const publicKey = await createKey();
    console.log('Send Key to backEnd', publicKey);
  }
}

async function createSignature() {
  let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
  let payload = `${epochTimeSeconds}biometricLogin`;
  const {success, signature} = await ReactNativeBiometrics.createSignature({
    promptMessage: 'Biometric Login',
    payload,
  });
  console.log('SIGNATURE', signature);
  console.log('SUCCESS', success);
}

function loginByBiometric() {
  if (verifyIfSensorIsAvailable()) {
    createSignature();
  }
}

function Biometric2() {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.viewContainer}>
          <Text>React Native App Test</Text>
          <Button onPress={sendKeyToBackEnd} title="Autorize Biometric Login" />
          <Button onPress={loginByBiometric} title="Test Biometric Login" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT - 30,
  },
});

export default Biometric2;