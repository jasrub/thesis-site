import Immutable from 'immutable';
import { ensureImmutable } from './index';

/* ---------- */
// Load Actions
/* ---------- */
import {
    GET_DESCRIPTORS_LOAD,
    GET_DESCRIPTORS_SUCCESS,
    GET_DESCRIPTORS_FAIL,
} from 'containers/Search/actions';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = Immutable.Map({
    loading: false,
    error: undefined,
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
                descriptors: []
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

        default:
            return ensureImmutable(state);
    }

}
