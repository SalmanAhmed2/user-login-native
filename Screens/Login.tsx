import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { View, TextInput, StyleSheet, ActivityIndicator } from 'react-native'
import { Container, Button, Text } from "native-base"
import { addToken } from "../Actions/actions"
const Login = (props) => {
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
                props.dispatch(addToken(response.token))
                props.navigation.navigate("Home")
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
                    <Button
                        onPress={handleSubmit} full style={styles.submitBTN} >
                        <Text>Submit</Text>
                    </Button>
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
        color: "#000",
        fontSize: 17,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        width: "100%",
    },
    submitBTN: {
        width: "100%",
        borderRadius: 15
    }
})
const mapStateToProps = (state) => ({
    token: state.tokenReducer.token
})
export default connect(mapStateToProps)(Login);