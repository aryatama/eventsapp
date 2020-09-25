import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import moment from 'moment';
import { SliderBox } from "react-native-image-slider-box";
import BookingModal from '../components/BookingModal';
import { useDispatch, useSelector } from 'react-redux';


export default function EventsDetailPage({ route }) {
    const { img, title, date, location, desc, fee, eventId, status } = route.params;
    const [modalView, setModalView] = useState(false)

    const toast = useSelector(state => state.message)

    const dispatch = useDispatch()

    const image = [
        img
        // require("../assets/images/img2.jpg"),
        // require("../assets/images/img1.jpg")
    ]

    const showToast = () => {
        ToastAndroid.show(toast.toastMessage, ToastAndroid.SHORT);
        dispatch({ type: "TOAST" })
    };

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
        <View style={styles.container}>
            <View style={{ width: "100%", height: "50%", justifyContent: "center", alignSelf: "center" }}>
                <SliderBox
                    images={image}
                    ImageComponentStyle={{ width: "100%", height: "100%" }}
                    imageLoadingColor="#E8505B"
                    dotColor="#E8505B"
                />
            </View>
            <ScrollView style={{ width: "100%", height: "40%" }} >
                <View style={styles.eventsDesc}>
                    <View>
                        <Text style={{ ...styles.text, fontSize: 18, marginBottom: 10, color: "#E8505B", fontWeight: "bold" }}>{moment(date).format("dddd, D MMMM YYYY")}</Text>
                        <Text style={{ ...styles.text, fontSize: 26, fontWeight: "bold", color: "black" }}>{title}</Text>
                        <Text style={{ ...styles.text }}>{location}</Text>
                        <Text style={{ ...styles.text, paddingBottom: 20 }}>Jakarta, Indonesia</Text>
                        <Text style={{ ...styles.text, lineHeight: 21 }} >{desc}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.textFooter}>SGD{moneyConvert(fee)} </Text>
                {status == "available" ?
                    <TouchableOpacity style={styles.footerButton} onPress={() => setModalView(!modalView)}>
                        <Text style={{ ...styles.textFooter, color: "white" }}>BOOK NOW</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.footerButton} disabled>
                        <Text style={{ ...styles.textFooter, color: "white" }}>EXPIRED</Text>
                    </TouchableOpacity>
                }
            </View>
            <BookingModal
                handleModal={() => setModalView(false)}
                modalView={modalView}
                date={date}
                location={location}
                title={title}
                eventId={eventId}
                fee={fee}
            />
            {toast.isToast && showToast()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#D1D1D1"
    },
    eventsDesc: {
        height: "100%",
        flexDirection: "column",
        padding: 15,
        justifyContent: "space-between",
        backgroundColor: "#D1D1D1"
    },
    text: {
        color: "black",
        fontSize: 14,
        color: "rgba(0,0,0,0.6)"
    },
    footer: {
        height: "10%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    textFooter: {
        color: "black", fontSize: 20, fontWeight: "bold",
    },
    footerButton: {
        backgroundColor: "#E8505B",
        padding: 10,
        borderRadius: 5
    }

})
