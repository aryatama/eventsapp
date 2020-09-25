const initState = {
    events: [],
    page : 0
}

export const eventsReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_EVENTS":
            return {
                ...state,
                events: action.payload,
                page : action.page
            }
        case "GET_MORE_EVENTS":
            let newEvents = [...state.events, ...action.payload]
            return {
                ...state,
                events: newEvents,
                page : action.page
            }
        default:
            return state;
    }
}