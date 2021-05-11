import React, { useState, useEffect } from 'react'
import { ActivityIndicator, View, Text, StyleSheet, AsyncStorage, FlatList, Button } from 'react-native';
export default function Home({ navigation, token }) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(false)
    const handleLogout = async () => {
        try {
            setLoading(true)
            await AsyncStorage.removeItem('token')
        } catch (e) {
            console.log(e)
        }
        navigation.navigate("Login")
        setLoading(false)
    }
    useEffect(async () => {
        setLoading(true)
        await fetch("https://reqres.in/api/unknown", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((response) => {
                setData(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    }, [])
    const Item = (props) => (
        <View>
            <Text style={styles.name} >{props.name}</Text>
            <Text style={styles.year}>{props.year}</Text>
        </View>
    );
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Item name={item.name} />
            <Item year={item.year} />
            <Button title="More" color="green" onPress={() => navigation.navigate('Details', { item })} />
        </View>
    );


    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button
                    onPress={handleLogout}
                    color="darkred"
                    title="Log out"
                />
                {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
                    <View>
                        <View style={styles.headers}>
                            <Text style={styles.nameHeader}>Name</Text>
                            <Text style={styles.yearHeader}>Year</Text>
                            <Text style={styles.moreHeader}>More</Text>
                        </View>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            style={styles.flatList}
                        />
                    </View>}
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    headers: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 5,
        marginTop: 20,
        backgroundColor: "lightblue",
        paddingVertical: 10,
        borderRadius: 5,
    },
    nameHeader: {
        fontSize: 21,
        fontWeight: "bold",
    },
    yearHeader: {
        fontSize: 21,
        fontWeight: "bold",
    },
    moreHeader: {
        fontSize: 21,
        fontWeight: "bold",
    },
    item: {
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        alignItems: "center",
        marginVertical: 5
    },
    name: {
        fontSize: 17,
        fontWeight: "500",
        position: "relative",
        top: 10,
    },
    year: {
        fontSize: 17,
        fontWeight: "500",
        position: "relative",
        bottom: 12
    }
})
