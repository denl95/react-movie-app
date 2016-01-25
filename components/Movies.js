import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import MovieInfo from './MovieInfo'

const SEARCH_TYPES = ['by title', 'by actor'];

export default class Movies extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(_id) {
        const { showDetails } = this.props;
        showDetails(_id);
    }

    search() {
        const { query, type } = this.refs;
        const { findByActor, findByTitle} = this.props;
        switch (type.value) {
            case "0":
                findByTitle(query.value.trim());
                break;
            case "1":
                findByActor(query.value.trim());
                break;
            default:
                break;
        }
    }

    render() {
        const { movies, deleteMovie, sortAscMovies, sortDescMovies } = this.props;
        console.log(movies);

        const liClass = classNames({
            'list-group-item': true
        });

        return (
            <div>
                <button onClick={sortAscMovies}>Sort asc</button><button onClick={sortDescMovies}>Sort desc</button>
                <div>
                    <span>Search:
                        <select ref="type">
                            {SEARCH_TYPES.map((type, i) => <option key={i} value={i}>{type}</option>)}
                        </select>
                        <input type="text" ref="query"/>
                        <button onClick={this.search.bind(this)}>ENTER</button>
                    </span>
                </div>
                <ul className="list-group">
                {movies.map((movie, i) =>
                    <li onClick={this.handleClick.bind(this, movie._id)} className={liClass} key={movie._id}><span onClick={deleteMovie.bind(null, movie._id)} className="glyphicon glyphicon-trash"></span>{movie.title}
                        <MovieInfo movie={movie}/>
                    </li>

                )}
                </ul>
            </div>
        )
    }
}
