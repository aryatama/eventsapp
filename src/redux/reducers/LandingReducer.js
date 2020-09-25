const initState = {
    isLanding: true,
}

export const landingReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_LANDING":
            return {
                ...state,
                isLanding: false,
            }
        default:
            return state;
    }
}