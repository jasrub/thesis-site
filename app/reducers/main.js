import Immutable from 'immutable';
import { ensureImmutable } from './index';

/* ---------- */
// Load Actions
/* ---------- */
import {
    GET_DESCRIPTORS_LOAD,
    GET_DESCRIPTORS_SUCCESS,
    GET_DESCRIPTORS_FAIL,
    GET_RELATED_LOAD,
    GET_RELATED_SUCCESS,
    GET_RELATED_FAIL,
} from 'containers/Main/actions';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = Immutable.Map({
    loading: false,
    error: undefined,
    relatedLoading: false,
    relatedError: false,
    descriptors: {},
});

/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */

export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case GET_DESCRIPTORS_LOAD:
            return state.merge({
                loading: true,
                error: undefined,
                descriptors: {},
            });
        case GET_DESCRIPTORS_SUCCESS:
            return state.merge({
                loading: false,
                error: undefined,
                descriptors: action.result
            });
        case GET_DESCRIPTORS_FAIL:
            return state.merge({
                loading: false,
                error: action.error,
                descriptors: null,
            });

        case GET_RELATED_LOAD:
            return state.merge({
                relatedLoading: true,
                relatedError: undefined,
            });
        case GET_RELATED_SUCCESS: {
            const newState = state.setIn(
                ['descriptors', action.descriptorId, 'related'], action.result);
            return newState.merge({
                relatedLoading: false,
                relatedError: undefined,
            });
        }
        case GET_RELATED_FAIL:
            return state.merge({
                relatedLoading: false,
                relatedError: action.error,
            });

        default:
            return ensureImmutable(state);
    }

}
