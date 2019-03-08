import * as types from '../constants/action-types';
import createReducer from '../../../utilities/create-reducer';

const initialState = {
    isPendingMessage: false,
    message: null
};

const actions = {
    [types.FETCH_MESSAGE_REQUEST]: state => ({ ...state, isPendingMessage: true }),

    [types.FETCH_MESSAGE_SUCCESS]: (state, { payload }) => ({ ...state, message: payload, isPendingMessage: false }),

    [types.FETCH_MESSAGE_FAILURE]: state => ({ ...state, isPendingMessage: false })
};

export default createReducer(initialState, actions);
