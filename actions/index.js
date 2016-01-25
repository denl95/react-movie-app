import fetch from 'isomorphic-fetch';
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
} from '../constants';


export function fetchMovies() {
    return dispatch => {
        return fetch('/api/movies')
                .then(response => response.json())
                .then(res => dispatch({
                    type: FETCH_MOVIES,
                    movies: res
                }))
                .catch(error => console.log(error));
    }
}

export function insertMovie(movie) {
    return dispatch => {
        console.log(movie);
        return fetch('/api/movies/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(movie)
                })
                .then(response => response.json())
                .then(res => {
                    dispatch({
                        type: ADD_MOVIE,
                        movie: res
                    })
                })
                .catch(error => console.log(error))
    }
}

export function deleteMovie(movie_id) {
    return dispatch => {
        return fetch(`/api/movies/${movie_id}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(res => dispatch({
                    type: DELETE_MOVIE,
                    movie_id
                }))
                .catch(error => console.log(error))
    }
}

export function showDetails(movie_id) {
    return {
        type: SHOW_DETAILS,
        movie_id
    }
}

export function sortAscMovies() {
    return {
        type: SORT_ASC
    }
}

export function sortDescMovies() {
    return {
        type: SORT_DESC
    }
}

export function findByTitle(query) {
    return {
        type: FIND_BY_TITLE,
        query
    }
}
export function findByActor(query) {
    return {
        type: FIND_BY_ACTOR,
        query
    }
}

export function uploadFile(fileData) {
    return dispatch => {
        return fetch('/api/upload', { method: 'POST', body: fileData })
            .then(response => response.json())
            .then(res => dispatch({
                type: UPLOAD_FILE,
                movies: res
            }))
            .catch(error => console.log(error))
    }
}