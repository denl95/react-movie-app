import { combineReducers } from 'redux';
import { movies, sort } from './movies';

const rootReducer = combineReducers({
    movies
});

export default rootReducer;