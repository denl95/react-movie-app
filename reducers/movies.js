import {
    FETCH_MOVIES,
    DELETE_MOVIE,
    ADD_MOVIE,
    SHOW_DETAILS,
    SORT_ASC,
    SORT_DESC,
    FIND_BY_ACTOR,
    FIND_BY_TITLE,
    UPLOAD_FILE
} from '../constants'


export function movies(state = [], action) {
    switch (action.type) {
        case FETCH_MOVIES:
            return action.movies;
        case DELETE_MOVIE:
            return state.filter(movie => action.movie_id != movie._id);
        case ADD_MOVIE:
            const newMovie = [action.movie];
            return state.concat(newMovie);
        case SHOW_DETAILS:
            return state.map(movie => {
                if((action.movie_id == movie._id)) {
                    movie.showInfo = !movie.showInfo;
                }
                return movie;
            });
        case SORT_ASC:
            return state.sort((a, b) => {
                const aTitle = a.title.toLowerCase();
                const bTitle = b.title.toLowerCase();
                if(aTitle < bTitle) {
                    return -1;
                }
                if(aTitle > bTitle) {
                    return 1;
                }
                return 0;
            }).concat([]);
        case SORT_DESC:
            return state.sort((a, b) => {
                const aTitle = a.title.toLowerCase();
                const bTitle = b.title.toLowerCase();
                if(aTitle < bTitle) {
                    return 1;
                }
                if(aTitle > bTitle) {
                    return -1;
                }
                return 0;
            }).concat([]);
        case FIND_BY_TITLE:
            return state.filter(value => value.title.toLowerCase().indexOf(action.query.toLowerCase()) != -1);
        case FIND_BY_ACTOR:
            return state.filter(value => !!value.actors.find(actor => actor.name.toLowerCase().indexOf(action.query.toLowerCase()) != -1));
        case UPLOAD_FILE:
            return state.concat(action.movies);
        default:
            return state
    }
}

