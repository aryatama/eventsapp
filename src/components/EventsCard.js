import React from 'react'
import moment from 'moment';
import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native'

export default function EventsCard(props) {
    const moneyConvert =(num)=> {
        var str = num.toString();
        let array = [];
        var chuncks =str.split('');
        var reverse_value = chuncks.reverse();
        let join = reverse_value.join('');
        for(let i = 0, len = join.length; i < len; i += 3) {
            array.push(join.substr(i, 3))
        }
        let arr_result = array.join(',')
        let arr_res = arr_result.split('');
        let rev_res = arr_res.reverse();
        let result = rev_res.join('')
        return result
    }

    return (
        <TouchableOpacity style={styles.content} onPress={() => props.handlePress()}>
            <Image source={{ uri: props.img }} style={styles.imgContent} resizeMode="cover" />
            <View style={styles.contentDesc}>
                <View style={styles.contentDate}>
                    <Text numberOfLines={3} style={{ ...styles.textContent, fontWeight: "bold", paddingHorizontal: 30, textAlign: "center" }}>{moment(props.date).format("Do MMM YYYY")}</Text>
                </View>
                <View style={{ width: "70%" }}>
                    <Text style={{ ...styles.textContent, fontWeight: "bold" }}>{props.title}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ backgroundColor: "#E8505B", paddingHorizontal: 8, borderRadius: 10, marginRight: 5, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 10 }}>{props.category}</Text>
                        </View>
                    </View>
                    <Text style={{ ...styles.textContent, }}>{props.location}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", position: "absolute", padding: 10, justifyContent:"center", alignItems:"center" }}>
                {props.fee == 0 ?
                    <View style={{ backgroundColor: "#42e6a4", paddingHorizontal: 8, borderRadius: 10, marginRight: 5, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontWeight:"bold" }}>Free</Text>
                    </View> :
                    <View style={{ backgroundColor: "#E8505B", paddingHorizontal: 8, borderRadius: 10, marginRight: 5, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontWeight:"bold"}}>SGD{moneyConvert(props.fee)}</Text>
                    </View>
                }
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        height: 280,
        backgroundColor: "#FEFEFE",
        marginBottom: 20,
        borderRadius: 12
    },
    imgContent: {
        width: "100%",
        height: "60%",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    contentDesc: {
        height: "40%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    contentDate: { width: "30%", justifyContent: "center", alignItems: "center" },

    textContent: {
        fontSize: 16,
        marginVertical: 2
    }

})
