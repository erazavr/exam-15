import axiosApi from "../../axiosApi";

export const FETCH_IMAGE_SUCCESS = 'FETCH_IMAGE_SUCCESS';
export const FETCH_IMAGE_FAILURE = 'FETCH_IMAGE_FAILURE';

export const fetchImageSuccess = image => ({type: FETCH_IMAGE_SUCCESS, image});
export const fetchImageFailure = error => ({type: FETCH_IMAGE_FAILURE, error});

export const addNewImage = imageData => {
    return async dispatch => {
        try {
            const response = await axiosApi.post('/images', imageData);
            dispatch(fetchImageSuccess());
            dispatch(getImagesByPlace(response.data.place))
        } catch (error) {
            dispatch(fetchImageSuccess(error))
        }
    }
};

export const getImagesByPlace = placeId => {
    return async dispatch => {
        try {
            let response;
            if(placeId) {
                response = await axiosApi.get('/images?place=' + placeId);
            } else {
                response = await axiosApi.get('/images');
            }

            dispatch(fetchImageSuccess(response.data))
        } catch (error) {
            dispatch(fetchImageFailure(error))
        }
    }
};

export const deleteImage = (id, placeId) => {
    return async dispatch => {
        try {
            await axiosApi.delete('/images/' + id);
            dispatch(getImagesByPlace(placeId))
            dispatch(fetchImageSuccess());

        } catch (error) {
            dispatch(fetchImageFailure(error))
        }
    }
};

