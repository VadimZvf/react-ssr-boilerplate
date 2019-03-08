import { FETCH_MESSAGE_REQUEST, FETCH_MESSAGE_SUCCESS, FETCH_MESSAGE_FAILURE } from '../constants/action-types';
import api from '../services/api';

export default () => async (dispatch, getState) => {
    const message = getState().main.message;

    // don't fetch message if it already exist
    if (!message) {
        try {
            dispatch({ type: FETCH_MESSAGE_REQUEST });

            const { data } = await api.fetchMessage();

            dispatch({ type: FETCH_MESSAGE_SUCCESS, payload: data });
        } catch (e) {
            dispatch({ type: FETCH_MESSAGE_FAILURE });
        }
    }
};
