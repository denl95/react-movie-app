import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class MovieInfo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {movie} = this.props;
        const classDiv = classNames({
            'show': !!movie.showInfo,
            'hide': !movie.showInfo
        });
        return (
            <div className={classDiv}>
                <div>
                    <span>Release Year: {movie.releaseYear}</span>
                </div>
                <div>
                    <span>Format: {movie.format}</span>
                </div>
                <div>
                    <span>Actors: {movie.actors.map((actor)=>actor.name).join(', ')}</span>
                </div>
            </div>
        )
    }
}