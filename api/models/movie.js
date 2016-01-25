var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    releaseYear: Number,
    format: String,
    actors: [Schema.Types.Mixed]
});

module.exports = mongoose.model('Movie', movieSchema);