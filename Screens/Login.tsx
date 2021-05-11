import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button, AsyncStorage, ActivityIndicator } from 'react-native'

const Login = ({ navigation, setUser }) => {
    const [values, setValues] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const handleSubmit = () => {
        setLoading(true)
        fetch("https://reqres.in/api/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        })
            .then((response) => response.json())
            .then((response) => {
                AsyncStorage.setItem('token', response.token)
                response.token && navigation.navigate('Home')
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            });
    }
    return (
        <View>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
                <View style={{ padding: 20 }}>
                    <TextInput
                        placeholderTextColor="grey"
                        onChangeText={(val) => setValues({ ...values, email: val })}
                        style={styles.input}
                        placeholder="Enter Your Email"
                    />
                    <TextInput
                        placeholderTextColor="grey"
                        onChangeText={(val) => setValues({ ...values, password: val })}
                        style={styles.input}
                        placeholder="Enter Your Password"
                        secureTextEntry={true}
                    />
                    <Button title="Submit" color="darkblue" onPress={handleSubmit} />
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 10,
        color:"#000",
        fontSize: 17,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    }
})
export default Login;