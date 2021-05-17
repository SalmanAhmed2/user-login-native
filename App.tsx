import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen'
import 'react-native-gesture-handler';
// custom reducers
import reducer from "./Reducers"
//custom Components
import Home from "./Screens/Home";
import Login from "./Screens/Login"
import Details from "./Screens/Details"

const Stack = createStackNavigator()
const store = createStore(reducer)
const App = () => {
  const [token, setToken] = useState("")
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* {
            token ? */}
          <Stack.Screen name="Home" component={Home}
            initialParams={{ setToken }}
          />
          <Stack.Screen name="Details" component={Details} />
          {/* // : */}
          <Stack.Screen name="Login" component={Login} />
          {/* } */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;