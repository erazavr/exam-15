import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const CREATE_PLACE_REQUEST = 'CREATE_PLACE_REQUEST';
export const CREATE_PlACE_SUCCESS = 'CREATE_PlACE_SUCCESS';
export const CREATE_PLACE_FAILURE = 'CREATE_PLACE_FAILURE';

export const createPlaceRequest = () => ({type: CREATE_PLACE_REQUEST});
export const createPlaceSuccess = place => ({type: CREATE_PlACE_SUCCESS, place});
export const createPlaceFailure = error => ({type: CREATE_PLACE_FAILURE, error});

export const createPlace = recipeData => {
    return async dispatch => {
        try {
            dispatch(createPlaceRequest());
            const response = await axiosApi.post('/places', recipeData);
            dispatch(createPlaceSuccess());
            dispatch(push('/onePlace/' + response.data._id))

        }catch (error) {
            dispatch(createPlaceFailure(error.response.data))
        }
    }
};

export const getPlaces = () => {
    return async dispatch => {
        try{
            dispatch(createPlaceRequest());
            const response = await axiosApi.get('/places');
            dispatch(createPlaceSuccess(response.data))
        }catch (error) {
            dispatch(createPlaceFailure(error))
        }
    }
};

export const getPlaceById = id => {
    return async dispatch => {
        try{
            dispatch(createPlaceRequest());
            const response = await axiosApi.get('/places/' + id);
            dispatch(createPlaceSuccess(response.data))
        }catch (error) {
            dispatch(createPlaceFailure(error))
        }
    }
};

export const deletePlace = id => {
    return async dispatch => {
        try{
            dispatch(createPlaceRequest());
            await axiosApi.delete('/places/' + id);
            dispatch(getPlaces())
        }catch (error) {
            dispatch(createPlaceFailure(error))
        }
    }
};