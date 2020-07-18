import {CREATE_PLACE_FAILURE, CREATE_PlACE_SUCCESS} from "../actions/placesAction";


const initialState = {
    places: [],
    errors: null
};
const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PlACE_SUCCESS:
            return {...state, places: action.place};
        case CREATE_PLACE_FAILURE:
            return {...state, errors: action.error}
        default:
            return state
    }
};

export default placesReducer