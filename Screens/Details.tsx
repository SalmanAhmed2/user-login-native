import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function Details({ navigation, route }) {
    const idd = route.params['item'].id
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState({})
    useEffect(() => {
        setLoading(true);
        fetch(`https://reqres.in/api/unknown/${idd}`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((response) => {
                setLoading(false)
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false);
            })
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
                <DataTable style={styles.detailContainer}>
                    <DataTable.Row><Text style={styles.text}>Name:{data.name}</Text></DataTable.Row>
                    <DataTable.Row><Text style={styles.text}>Year:{data.year}</Text></DataTable.Row>
                    <DataTable.Row><Text style={styles.text}>Color:{data.color}</Text></DataTable.Row>
                    <DataTable.Row><Text style={styles.text}>Pantone Value:{data.pantone_value}</Text></DataTable.Row>
                </DataTable>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    detailContainer: {
        padding: 20,
        margin: 20,
        borderRadius: 20,
        backgroundColor: "white",

    },
    text: {
        fontSize: 20,
        fontFamily: "Rubik"
    }
})
