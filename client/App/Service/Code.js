import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Code() {
  const [authenticationResult, setAuthenticationResult] = useState(null);

  useEffect(() => {
    async function authenticate() {
      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate to access your data', 
          cancelLabel: 'Cancel', 
        });

        setAuthenticationResult(result);
        if (result.success) {
          console.log('Authentication successful');
        } else {
          console.log('Authentication failed');
        }
      } catch (error) {
        console.error('Authentication error:', error.message);
      }
    }

    authenticate();
  }, []);

  return (
    <View style={styles.container}>
      {authenticationResult && (
        <Text style={styles.resultText}>
          {authenticationResult.success
            ? 'Authentication successful'
            : 'Authentication failed'}
        </Text>
      )}
      <TouchableOpacity onPress={() => authenticate()} style={styles.button}>
        <Text style={styles.buttonText}>Welcom</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  resultText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});
