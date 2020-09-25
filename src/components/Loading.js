import React from 'react'
import { StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'


export default function Loading() {

    const message = useSelector(state => state.message)

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={message.isLoading}
        >

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0, 0.6)" }}>
                <ActivityIndicator size="large" color="#E8505B" />
                <Text style={{ color: "#E8505B", fontWeight:"bold" }}>Loading...</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({})
