import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { booking } from '../redux/actions/EventsAction';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BookingModal(props) {
    const [email, setEmail] = useState("")
    const [checkEmail, setCheckEmail] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const dispatch = useDispatch()

    const handleBooking = (email, eventId) => {
        if (checkEmail !== false && email !== "") {
            dispatch(booking(email, eventId))
            dispatch({ type: "LOADING" })
            props.handleModal()
        }
        else {
            setShowAlert(true)
        }
    }

    const handleCheckEmail = (val) => {
        setEmail(val)
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(email)) {
            setCheckEmail(true)
        } else {
            setCheckEmail(false)
        }

    }
    const moneyConvert = (num) => {
        var str = num.toString();
        let array = [];
        var chuncks = str.split('');
        var reverse_value = chuncks.reverse();
        let join = reverse_value.join('');
        for (let i = 0, len = join.length; i < len; i += 3) {
            array.push(join.substr(i, 3))
        }
        let arr_result = array.join(',')
        let arr_res = arr_result.split('');
        let rev_res = arr_res.reverse();
        let result = rev_res.join('')
        return result
    }


    return (
        <Modal isVisible={props.modalView} onBackdropPress={() => props.handleModal()} backdropTransitionOutTiming={0} animationIn="fadeIn" animationInTiming={300} animationOut="fadeOut" animationOutTiming={300}>
            <View style={styles.container}>
                <View style={styles.backgrndModal} >
                    <Text style={{ ...styles.bookingTitle, fontSize: 14, color: "#E8505B", marginBottom: 5 }}>{moment(props.date).format("dddd, D MMMM YYYY")}</Text>
                    <Text style={styles.bookingTitle}>{props.title}</Text>
                    <Text style={{ ...styles.bookingTitle, fontSize: 14, fontWeight: "normal" }}>{props.location}</Text>
                    <View style={styles.textInput}>
                        <TextInput placeholder="Email" value={email} style={{ width: "80%" }} onChangeText={(val) => handleCheckEmail(val)} />
                        {email == "" ? null :
                            <Icons name={checkEmail ? "check-circle" : "close-circle-outline"} color={checkEmail ? "#E8505B" : "rgba(0,0,0,0.4)"} size={28} />
                        }
                    </View>
                    {showAlert ?
                        (!checkEmail ? <Text style={{color:"red"}}>*Invalid email</Text> : null ):
                        null
                    }
                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 10 }}>
                        <Text style={{ ...styles.textFooter, color: "black" }}>
                            SGD{moneyConvert(props.fee)}
                        </Text>
                        <TouchableOpacity style={styles.footerButton} onPress={() => handleBooking(email, props.eventId)}>
                            <Text style={{ ...styles.textFooter, color: "white" }}>BOOK NOW</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", alignItems: "center"
    },
    backgrndModal: {
        width: "90%",
        backgroundColor: "#D1D1D1", borderRadius: 5, padding: 20
    },
    bookingTitle: {
        fontSize: 26, fontWeight: "bold", color: "black",
    },
    textInput: {
        backgroundColor: "white",
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    footerButton: {
        backgroundColor: "#E8505B",
        padding: 8,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    textFooter: {
        color: "black", fontSize: 20, fontWeight: "bold",
    },

})
