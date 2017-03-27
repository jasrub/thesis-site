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
    GET_STORIES_LOAD,
    GET_STORIES_SUCCESS,
    GET_STORIES_FAIL,
    GET_IMAGE_LOAD,
    GET_IMAGE_SUCCESS,
    GET_IMAGE_FAIL,
    GET_SOURCES_LOAD,
    GET_SOURCES_SUCCESS,
    GET_SOURCES_FAIL,
} from 'containers/Main/actions';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = Immutable.Map({
    loading: false,
    error: undefined,
    relatedLoading: false,
    relatedError: false,
    allDescriptors: [],
    descriptors:{},
    stories:{},
    storiesLoading: false,
    storiesError: false,
    storyCount:0,
    relatedTopics: Immutable.Map({}),
    sources:{},
    sourcesLoading:false,
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
        case GET_DESCRIPTORS_SUCCESS: {
            return state.merge({
                loading: false,
                error: undefined,
                descriptors: action.result.descriptors,
                storyCount: action.result.storyCount,
            });
        }
        case GET_DESCRIPTORS_FAIL:
            return state.merge({
                loading: false,
                error: action.error,
                descriptors: null,
            });

        case GET_STORIES_LOAD:
            return state.merge({
                storiesLoading: true,
                storiesError: undefined,
                stories: {},
            });
        case GET_STORIES_SUCCESS:
            return state.merge({
                storiesLoading: false,
                error: undefined,
                stories: action.result
            });
        case GET_STORIES_FAIL:
            return state.merge({
                storiesLoading: false,
                storiesError: action.error,
                stories: null,
            });

        case GET_RELATED_LOAD:
        return state.merge({
            relatedLoading: true,
            relatedError: undefined,
        });
        case GET_RELATED_SUCCESS: {
            const newState = state.setIn(['relatedTopics', action.descriptorId], action.result);
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

        case GET_IMAGE_SUCCESS: {
            return state.setIn(['stories', action.storyId, 'image'], action.result);
        }
        case GET_IMAGE_FAIL: {
            return state;
        }
        case GET_SOURCES_LOAD: {
            return state.merge({
                sourcesLoading:true,
            });
        }
        case GET_SOURCES_SUCCESS: {
            return state.merge({
                sources:action.result,
                sourcesLoading:false
            });
        }

        default:
            return ensureImmutable(state);
    }

}
