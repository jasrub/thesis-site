import Immutable from 'immutable';
import { ensureImmutable } from './index';

/* ---------- */
// Load Actions
/* ---------- */
import {
    SEARCH_LOAD,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
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
        case SEARCH_LOAD:
            return state.merge({
                loadingSearch: true,
                error: undefined,
                searchResults: []
            });
        case SEARCH_SUCCESS:
            return state.merge({
                loadingSearch: false,
                error: undefined,
                searchResults: action.result
            });
        case SEARCH_FAIL:
            return state.merge({
                loadingSearch: false,
                error: action.error,
                searchResults: null,
            });


        default:
            return ensureImmutable(state);
    }

}
/**
 * Created by jasrub on 3/8/17.
 */
