import React, { Component, PropTypes } from 'react';


export default class UploadFile extends Component {
    constructor(props) {
        super(props);
    }

    handleUpload(e){
        e.preventDefault();
        const { uploadFile } = this.props;
        const file = this.refs.file.files[0];
        const form = new FormData();
        form.append('file', file);
        uploadFile(form);
    }

    render() {
        return (
            <form onSubmit={this.handleUpload.bind(this)} encType="multipart/form-data">
                <input type="file" name="file" ref="file"  />
                <input type="submit" value="Upload" />
            </form>
        )
    }
}