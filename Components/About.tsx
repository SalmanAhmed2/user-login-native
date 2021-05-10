import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function About({ navigation, route }) {
    console.log(route.params.name, "route")
    return (
        <View style={styles.container}>
            <Text style={styles.about}>About Page</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
    },
    about: {
        fontSize: 24,
        flex: 1,
    }
})
