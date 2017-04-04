import Immutable from 'immutable';
import { ensureImmutable } from './index';

/* ---------- */
// Load Actions
/* ---------- */
import {
    POST_LABEL_LOAD,
    POST_LABEL_SUCCESS,
    POST_LABEL_FAIL,
} from 'components/StoryControls/actions';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = Immutable.Map({
    loading: false,
    error: undefined,
    completed: false,
});

/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */
export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case POST_LABEL_LOAD:
            return state.merge({
                loading: true,
                error: undefined,
            });
        case POST_LABEL_SUCCESS:
            return state.merge({
                loading: false,
                error: undefined,
                completed: true,
            });
        case POST_LABEL_FAIL:
            return state.merge({
                loading: false,
                error: action.error,
            });
        default:
            return ensureImmutable(state);

    }

}
