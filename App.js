import React, { useState, useEffect } from 'react';
import { StatusBar, ImageBackground } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

// Create a Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  // Use state to keep track of whether the timeout has finished
  const [timeoutFinished, setTimeoutFinished] = useState(false);

  // UseEffect to navigate to Home Page after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutFinished(true);
    }, 3000);

    // Clear timeout if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, []);

  // Render ImageBackground if timeout has not finished yet
  if (!timeoutFinished) {
    return (
      <ImageBackground
        source={require('./assets/back.jpg.png')}
        style={styles.background}
      >
        <View style={styles.container}>
          <Text>Task Buddy</Text>
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    );
  }

  // After timeout, navigate to Home Page
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' for other resize mode options
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});