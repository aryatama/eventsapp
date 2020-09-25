import Axios from "axios"

const BASE_URL = "https://event-finder-team-c.herokuapp.com"

export const getEvents = (page, fee, category, date) => {
    return async dispatch => {
        try {
            console.log(`/api/v1/event/all?page=${page}&fee=${fee}&category=${category}&date=${date}`);
            const resEvents = await Axios.get(`${BASE_URL}/api/v1/event/all?page=${page}&fee=${fee}&category=${category}&date=${date}`)
            const dataEvents = resEvents.data.data.events
            const eventPage = resEvents.data.data.page

            if (resEvents.status == 200) {

                dispatch({ type: "GET_EVENTS", payload: dataEvents, page: eventPage })
                dispatch({ type: "LOADING" })

                console.log("data Router", dataEvents, eventPage)
            }

        } catch (error) {
            console.log(error)
            dispatch({ type: "LOADING" })

        }
    }
}

export const getMoreEvents = (page, fee, category, date) => {
    return async dispatch => {
        try {
            console.log(`/api/v1/event/all?page=${page}&fee=${fee}&category=${category}&date=${date}`);
            const resEvents = await Axios.get(`${BASE_URL}/api/v1/event/all?page=${page}&fee=${fee}&category=${category}&date=${date}`)
            const dataEvents = resEvents.data.data.events
            const eventPage = resEvents.data.data.page

            if (resEvents.status == 200) {

                dispatch({ type: "GET_MORE_EVENTS", payload: dataEvents, page: eventPage })
                dispatch({ type: "LOADING" })

                console.log("data Router", dataEvents, eventPage)
            }

        } catch (error) {
            console.log(error)
            dispatch({ type: "LOADING" })

        }
    }
}



export const booking = (Email, EventId) => {
    console.log("Booking", Email, EventId)

    return async dispatch => {
        try {
            const resBooking = await Axios.post(`${BASE_URL}/api/v1/booking/create`, {
                email: Email,
                eventId: EventId
            })

            if (resBooking.status == 201) {
                dispatch({ type: "LOADING" })
                dispatch({ type: "TOAST", toastMessage: "Booking success, please check your email!" })

                console.log("Response Booking", resBooking.data.data)

            } else {
                dispatch({ type: "LOADING" })
                dispatch({ type: "TOAST", toastMessage: "Booking failed, your email has been registered!" })
            }

        } catch (error) {
            console.log(error)
            dispatch({ type: "LOADING" })
            dispatch({ type: "TOAST", toastMessage: "Booking failed, your email has been registered!" })
        }
    }
}
