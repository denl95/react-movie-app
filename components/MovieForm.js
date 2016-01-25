import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ActorField from './ActorField';

const formats = ['VHS', 'DVD', 'Blu-Ray'];

export default class MovieForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actors: [{name: null}]
        }
    }
    addActor() {
        this.state.actors.push({name: null});
        this.setState(this.state);
    }
    handleActor(i, value) {
        this.state.actors[i].name = value;
        this.setState(this.state);
    }
    clear() {
        this.refs.title.value = '';
        this.refs.releaseYear.value = '';
        this.setState({
            actors: [{name: null}]
        });
    }

    saveMovie() {
        const actors = this.state.actors.filter(actor => !!actor.name);
        const { title, releaseYear, format } = this.refs;
        const movie = {
            title: title.value,
            releaseYear: releaseYear.value,
            format: format.value,
            actors
        };
        this.props.insertMovie(movie);
        this.clear();
    }

    render() {

        return (
            <div>
                <label>Title</label>
                <input type="text" ref="title"/>
                <label>Release Year</label>
                <input type="number" ref="releaseYear"/>
                <label>Format</label>
                <select ref="format">
                    {formats.map(format =>
                        <option value={format}>{format}</option>
                    )}
                </select><br/>
                <label>Actors</label><br/>
                {this.state.actors.map((actor, i) =>
                    <ActorField handleActor={this.handleActor.bind(this, i)} actor={actor} key={i}/>
                )}
                <button onClick={this.addActor.bind(this)}>Add Actor</button><br/>
                <button onClick={this.saveMovie.bind(this)}>Add Movie</button>
            </div>
        )
    }
}
/*
{this.state.actors.map((actor, i) =>
    <input type="text" valueLink={
                    function(value) {
                        return {value: actor.name, requestChange: this.handleActors}
                    }.bind(this)()
                    }/>
)}*/
