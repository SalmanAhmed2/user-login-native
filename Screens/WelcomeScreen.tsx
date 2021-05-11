import React, { useState, useEffect } from "react"
import { Text } from "react-native"
import SplashScreen from 'react-native-splash-screen'
export default function WelcomePage() {
    React.useEffect(() => { SplashScreen.hide() }, [])
    return <Text>Welcome</Text>
}