import * as React from 'react';
import { useState, useEffect } from 'react';
import type { Node } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, AsyncStorage } from 'react-native';
import 'react-native-gesture-handler';

//custom Components
import Home from "./Screens/Home";
import Login from "./Screens/Login"
import Details from "./Screens/Details"

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
  }), [token];

  // const authScreen = {
  //   Login: Login,
  //   name: "Login"
  // }
  // const userScreens = {
  //   Home: Home,
  //   name: "Home"
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ?
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={Details} />
          </>
          :
          <Stack.Screen name="Login" component={Login} />
        }
        {/* {Object.entries({
          ...(token ? userScreens : authScreen),
        }).map(([name, component]) => (
          <Stack.Screen name={name} component={component} />
        ))} */}
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({

});

export default App;