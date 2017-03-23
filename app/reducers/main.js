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
});

/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */
function filterDescriptors(state = defaultState, filters) {
    const allDescriptors = state.get('allDescriptors').toJS();
    const result = {};
    //if (allDescriptors) {
        allDescriptors.forEach((desc) => {
            const obj ={};
            obj.id = desc.id;
            obj.DescriptorsResults = desc.DescriptorsResults;
            if (obj.DescriptorsResults.length > 0) {
                    result[desc.id] = obj;
                    obj.score = obj.DescriptorsResults.reduce((acc, val) => acc + val.score, 0);
                    obj.numStories = obj.DescriptorsResults.length;
                    obj.avgScore = obj.score / obj.numStories;
                    obj.DescriptorsResults.slice(0, 100);
                }
            }
        );
    //}
    console.log(result);
    return result
}


export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case GET_DESCRIPTORS_LOAD:
            return state.merge({
                loading: true,
                error: undefined,
                allDescriptors: [],
                descriptors: {},
            });
        case GET_DESCRIPTORS_SUCCESS: {
            const newState = state.merge({
                loading: false,
                error: undefined,
                allDescriptors: action.result,
            });
            const descriptors = filterDescriptors(newState, {});
            return newState.merge({
                descriptors:descriptors
            })
        }
        case GET_DESCRIPTORS_FAIL:
            return state.merge({
                loading: false,
                error: action.error,
                allDescriptors: null,
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
