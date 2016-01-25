import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions  from '../actions';
import Movies from '../components/Movies';
import MovieForm from '../components/MovieForm';
import UploadFile from '../components/UploadFile';
import '../dist/css/main.css';

class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { fetchMovies } = this.props;
        fetchMovies();
    }
    render() {
        const { movies, deleteMovie, insertMovie, showDetails, sortAscMovies, sortDescMovies, findByTitle, findByActor, uploadFile } = this.props;
        return (
            <div className="container">
                <MovieForm insertMovie={insertMovie}/>
                <UploadFile uploadFile={uploadFile}/>
                <Movies findByActor={findByActor} findByTitle={findByTitle} sortDescMovies={sortDescMovies} sortAscMovies={sortAscMovies} showDetails={showDetails} deleteMovie={deleteMovie} movies={movies}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        movies: state.movies,
        message: state.message
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)