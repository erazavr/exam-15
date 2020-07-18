import {FETCH_IMAGE_SUCCESS} from "../actions/imagesAction";

const initialState = {
  images: []
};

const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_IMAGE_SUCCESS:
            return {...state, images: action.image};
        default:
            return state
    }
};

export default imagesReducer