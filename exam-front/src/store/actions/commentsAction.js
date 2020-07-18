import axiosApi from "../../axiosApi";

export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';
export const FETCH_COMMENT_REQUEST = 'FETCH_COMMENT_REQUEST';
export const FETCH_COMMENT_FAILURE = 'FETCH_COMMENT_FAILURE';

export const fetchCommentSuccess = comment => ({type: FETCH_COMMENT_SUCCESS, comment});
export const fetchCommentRequest = () => ({type: FETCH_COMMENT_REQUEST});
export const fetchCommentFailure = error => ({type: FETCH_COMMENT_FAILURE, error});

export const addComment = commentData => {
    return async dispatch => {
        try {
            dispatch(fetchCommentRequest());
            const response = await axiosApi.post('/comments', commentData);
            dispatch(fetchCommentSuccess());
            dispatch(getComments(response.data.place))
        }catch (error) {
            dispatch(fetchCommentFailure(error))
        }
    }
};

export const getComments = id => {
    return async dispatch => {
        try {
            dispatch(fetchCommentRequest());
            let response;
            if(id) {
                response = await axiosApi.get('/comments?place=' + id)
            } else {
                response = await axiosApi.get('/comments')
            }

            dispatch(fetchCommentSuccess(response.data))

        }catch (error) {
            dispatch(fetchCommentFailure(error))
        }
    }
};

export const deleteComment = (id,placeId) => {
    return async dispatch => {
        try{
            dispatch(fetchCommentRequest());
            await axiosApi.delete('/comments/' + id);
            dispatch(fetchCommentSuccess());
            dispatch(getComments(placeId))
        }catch (error) {
            dispatch(fetchCommentFailure(error))
        }

    }
};