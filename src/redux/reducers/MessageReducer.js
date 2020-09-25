const initState = {
    isLoading: false,
    toastMessage: "",
    isToast: false,
}

export const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING":
            let loading = state.isLoading
            return {
                ...state,
                isLoading: !loading
            }

        case "TOAST":
            let toast = state.isToast
            return {
                ...state,
                isToast: !toast,
                toastMessage: action.toastMessage
            }

        default:
            return state;
    }
}