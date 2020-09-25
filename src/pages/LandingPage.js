import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

export default function LandingPage({ navigation }) {
    const dispatch = useDispatch()
    
    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/img2.jpg")} style={styles.background} />
            <View style={styles.section}>
                <View style={{ marginVertical: 20 }}>
                    <Text style={styles.title}>EventsApp</Text>
                    <Text style={styles.desc}>Discover upcoming events near you and get personalized recommendations. Stay up on the latest for popular events like concerts, festivals, yoga classes, holiday events on New Year’s Eve or Halloween and networking events.</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EventsPage")} >
                    <Text style={styles.textButton}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    background: {
        height: "100%",
        resizeMode: "contain",
        position: 'absolute'
    },

    section: {
        flex: 1,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        position: "relative",
        justifyContent: "flex-end",
        padding: 16
    },
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 56
    },
    desc: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 16
    },
    button: {
        marginVertical: 24,
        width: "100%",
        height: 64,
        backgroundColor: "#E8505B",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5
    },
    textButton: {
        color: "white",
        fontSize: 24,
    }


})
