/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ReactNativeBiometrics from 'react-native-biometrics';
import {useEffect} from 'react';



const Bioexpo= () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const isBiometricSupport = async () => {
    let {available, biometryType} =
      await ReactNativeBiometrics.isSensorAvailable();
    if (available && biometryType === ReactNativeBiometrics.TouchID) {
      console.log('TouchID is supported', biometryType);
    } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
      console.log('FaceID is supported', biometryType);
    } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
      console.log('Biometrics is supported', biometryType);
    } else {
      return console.log('Biometrics not supported', biometryType);
    }
    let {success, error} = await ReactNativeBiometrics.simplePrompt({
      promptMessage: 'Sign in with Touch ID',
      // cancelButtonText: 'Close',
    });
    console.log({success, error});
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        <TouchableHighlight
          style={{
            height: 60,
          }}>
          <Button
            title="Login with Biometrics"
            color="#fe7005"
            onPress={isBiometricSupport}
          />
        </TouchableHighlight>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
         
          <TouchableOpacity onClick={isBiometricSupport}>
            <DebugInstructions />
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Bioexpo;