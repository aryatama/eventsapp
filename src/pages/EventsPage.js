import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-community/picker';
import { StyleSheet, Text, View, FlatList } from 'react-native'
import EventsCard from '../components/EventsCard';
import { useSelector, useDispatch } from 'react-redux';
import { getEvents, getMoreEvents } from '../redux/actions/EventsAction';

export default function EventsPage({ navigation }) {
    const [category, setCategory] = useState("")
    const [date, setDate] = useState("")
    const [price, setPrize] = useState("")
    const [thePage, setThePage] = useState(1)

    const events = useSelector(state => state.events.events)
    const page = useSelector(state => state.events.page)

    const dispatch = useDispatch()

    const handleLoadMore = () => {
        console.log("ini jlanan, beenenran", thePage)
        if (thePage < page) {
            dispatch(getMoreEvents(thePage + 1, price, category, date))
            dispatch({ type: "LOADING" })

            setThePage(thePage + 1)
        }
    }

    useEffect(() => {
        dispatch(getEvents(thePage, price, category, date))
        dispatch({ type: "LOADING" })
    }, [])

    const handleChangeCategory = (category) => {
        dispatch({ type: "LOADING" })
        dispatch(getEvents(1, price, category, date))
        setThePage(1)
    }

    const handleChangeFee = (price) => {
        dispatch({ type: "LOADING" })
        dispatch(getEvents(1, price, category, date))
        setThePage(1)
    }
    const handleChangeDate = (date) => {
        dispatch({ type: "LOADING" })
        dispatch(getEvents(1, price, category, date))
        setThePage(1)
    }



    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Upcoming Events</Text>
            <View style={styles.categoryContainer}>
                <View style={styles.category}>
                    <Picker
                        // https://www.npmjs.com/package/react-native-dropdown-picker
                        mode="dropdown"
                        selectedValue={category}
                        style={styles.picker}
                        itemStyle={{ fontSize: 8 }}
                        onValueChange={(itemValue) => {
                            setCategory(itemValue)
                            handleChangeCategory(itemValue)
                        }

                        }
                    >
                        <Picker.Item label="Category" value="" />
                        <Picker.Item label="Food & Drinks" value="1" />
                        <Picker.Item label="Hobbies" value="2" />
                        <Picker.Item label="Sport & Fitness" value="3" />
                        <Picker.Item label="Music" value="4" />
                        <Picker.Item label="Science & Tech" value="5" />
                        <Picker.Item label="Other" value="6" />
                    </Picker>
                </View>
                <View style={styles.category}>
                    <Picker
                        mode="dropdown"
                        selectedValue={price}
                        style={styles.picker}
                        onValueChange={(itemValue) => {
                            setPrize(itemValue)
                            handleChangeFee(itemValue)
                        }
                        }
                    >
                        <Picker.Item label="Price" value="" />
                        <Picker.Item label="Free" value="free" />
                        <Picker.Item label="Paid" value="paid" />
                    </Picker>
                </View><View style={styles.category}>
                    <Picker
                        mode="dropdown"
                        selectedValue={date}
                        style={styles.picker}
                        onValueChange={(itemValue) => {
                            setDate(itemValue)
                            handleChangeDate(itemValue)
                        }
                        }
                    >
                        <Picker.Item label="Date" value="" />
                        <Picker.Item label="Upcoming" value="upcoming" />
                        <Picker.Item label="Past" value="past" />
                    </Picker>
                </View>
            </View>


            <View style={styles.contentContainer}>
                {events.length == 0 ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{fontSize:24, color:"#E8505B", fontWeight:"bold"}}>Events Not Found</Text>
                    </View>
                    :
                    <FlatList
                        data={events}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <EventsCard
                                img={item.image}
                                date={item.createdAt}
                                title={item.title}
                                location={item.location}
                                fee={item.fee}
                                category={item.categoryInfo.name}

                                handlePress={() => navigation.navigate("EventsDetailPage", {
                                    img: item.image,
                                    date: item.createdAt,
                                    title: item.title,
                                    location: item.location,
                                    desc: item.description,
                                    fee: item.fee,
                                    eventId: item.id,
                                    category: item.categoryInfo.name,
                                    status: item.status
                                })}
                            />
                        )}
                        keyExtractor={item => `item ${item.id}`}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => handleLoadMore()}
                    />
                }
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
        backgroundColor: "#D1D1D1"
    },
    textTitle: {
        alignSelf: "flex-start",
        fontSize: 32,
        fontWeight: "bold",
    },
    categoryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 20,
        width: "100%"
    },
    category: {
        width: "31%",
        height: 46,
        backgroundColor: "#FEFEFE",
        justifyContent: "center",
        borderRadius: 4
    },
    picker: {
        color: "#E8505B",
    },
    contentContainer: {
        width: "100%",
        height: "85%",

    },
    // content: {
    //     width: "100%",
    //     height: 280,
    //     backgroundColor: "#FEFEFE",
    //     marginBottom: 20,
    //     borderRadius: 12
    // },
    // imgContent: {
    //     width: "100%",
    //     height: "60%",
    //     borderTopLeftRadius: 12,
    //     borderTopRightRadius: 12
    // },
    // contentDesc: {
    //     height: "40%",
    //     flexDirection: "row",
    //     justifyContent: "center",
    //     alignItems: "center"
    // },
    // contentDate: { width: "30%", justifyContent: "center", alignItems: "center" },

    // textContent: {
    //     fontSize: 16,
    //     marginVertical: 2
    // }

})
