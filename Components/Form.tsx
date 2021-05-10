import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button, AsyncStorage } from 'react-native'

const Form = ({ navigation, setUser }) => {
    const [values, setValues] = useState([]);
    const [isLoading,setLoading]=useState(false)
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
                setLoading(false)
                AsyncStorage.setItem('token', response.token)
                response.token && navigation.navigate('Home')
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            });
    }
    return (
        <View style={{ padding: 20 }}>
            <TextInput
                onChangeText={(val) => setValues({ ...values, email: val })}
                style={styles.input}
                placeholder="Enter Your Email"
            />
            <TextInput
                onChangeText={(val) => setValues({ ...values, password: val })}
                style={styles.input}
                placeholder="Enter Your Password"
                secureTextEntry={true}
            />
            <Button title="Submit" color="darkblue" onPress={handleSubmit} />
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 8,
        fontSize: 19
    }
})
export default Form
