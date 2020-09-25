import { combineReducers } from "redux";
import { landingReducer } from "./LandingReducer";
import { eventsReducer } from "./EventsReducer";
import { messageReducer } from "./MessageReducer";

export default combineReducers ({
    landing : landingReducer,
    events : eventsReducer,
    message : messageReducer
})