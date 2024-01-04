import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const AndroidBiometric = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    // createKeys: publicKeystring A base64 encoded string
    rnBiometrics.createKeys()
        .then((resultObject) => {
            const { publicKey } = resultObject
            console.log("publicKey",publicKey)
            sendPublicKeyToServer(publicKey)
        })
    // biometricKeysExist()
    rnBiometrics.biometricKeysExist()
        .then((resultObject) => {
            const { keysExist } = resultObject

            if (keysExist) {
                console.log('Keys exist')
            } else {
                console.log('Keys do not exist or were deleted')
            }
        })
    // deleteKeys
        rnBiometrics.deleteKeys()
        .then((resultObject) => {
          const { keysDeleted } = resultObject
      
          if (keysDeleted) {
            console.log('Successful deletion')
          } else {
            console.log('Unsuccessful deletion because there were no keys to delete')
          }
        })
        rnBiometrics.isSensorAvailable()
        .then((resultObject) => {
          const { available, biometryType } = resultObject
      
          if (available && biometryType === BiometryTypes.TouchID) {
            console.log('TouchID is supported')
          } else if (available && biometryType === BiometryTypes.FaceID) {
            console.log('FaceID is supported')
          } else if (available && biometryType === BiometryTypes.Biometrics) {
            console.log('Biometrics is supported')
          } else {
            console.log('Biometrics not supported')
          }
        })

    handleAuthenticate = async () => {
        try {
            const { available, biometryType } = await ReactNativeBiometrics.isSensorAvailable();
           console.log("Android-available",available)
            if (available) {
                const result = await ReactNativeBiometrics.simplePrompt({
                    promptMessage: 'Authenticate',
                });

                if (result.success) {
                    // Biometric authentication successful
                } else {
                    // Biometric authentication failed
                }
            } else {
                // Biometric authentication not available
                // fallback to username/password login 
            }
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <View>
            <Text>Biometric Authentication Example</Text>
            <TouchableOpacity onPress={this.handleAuthenticate}>
                <Text>Authenticate</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AndroidBiometric;