import AsyncStorage from '@react-native-community/async-storage';


export const checkLanding = () => {
    return async dispatch => {
        try {
            const res = await AsyncStorage.getItem("@isLanding")
            console.log("this is data of isLanding", res)
            if (res !== null) {
                dispatch({ type: 'SET_LANDING' })
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const setLanding = () => {
    return async dispatch => {
        try {
            const res = await AsyncStorage.setItem("@isLanding", false)
            console.log("this is data of isLanding", res)
            dispatch({ type: 'SET_LANDING' })

        } catch (error) {
            console.log(error)
        }
    }
}