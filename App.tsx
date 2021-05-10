import 'react-native-gesture-handler';
import type { Node } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Components/Home";
import Form from "./Components/Form"
const Stack = createStackNavigator();
const App: () => Node = () => {
  const [token, setToken] = useState(null)
  useEffect(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('token')
      setToken(jsonValue)
    } catch (e) {
      console.log(e)
    }
  }), [token]
  const authScreen = {
    Form: Form,
    name: "Form"
  }
  const userScreens = {
    Home: Home,
    name: "Home"
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {Object.entries({
          ...(token ? userScreens : authScreen),
        }).map(([name, component]) => (
          <Stack.Screen name={name} component={component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({

});

export default App;
