import React, { Component, PropTypes } from 'react';

export default class ActorField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {handleActor, actor} = this.props;
        const valueLink = {
            value: actor.name,
            requestChange: handleActor
        };
        return (
                <div>
                    <input type="text" valueLink={valueLink}/>
                </div>
        )
    }
}