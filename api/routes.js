var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var Movie = require('./models/movie');
var parseMovies = require('./util').parseMovies;

router.route('/movies')
    .get(function(req, res) {
        Movie.find(function(err, movies) {
            if (err) {
                res.send(err);
            }
            res.json(movies);
        });
    })
    .post(function(req, res) {
        var movie = new Movie({
            title: req.body.title,
            releaseYear: req.body.releaseYear,
            format: req.body.format,
            actors: req.body.actors
        });
        movie.save(function(err, movie) {
            if(err) {
                res.end(err);
            }

            res.json(movie);
        });
    });

router.route('/movies/:movie_id')
    .get(function(req, res) {
        Movie.findById(req.params.movie_id, function(err, movie) {
            if(err) {
                res.end(err);
            }
            res.json(movie);
        });
    })
    .put(function(req, res) {
        Movie.findById(req.params.movie_id, function(err, movie) {
            if(err) {
               res.end(err);
            }
            movie.title = req.body.title;
            movie.releaseYear = req.body.releaseYear;
            movie.format =  req.body.format;
            movie.actors = req.body.actors;
            movie.save(function(err) {
                if(err) {
                    res.end(err);
                }
                res.json({ message: 'Movie updated!' });
            });
        });
    })
    .delete(function(req, res) {
        Movie.remove({ _id: req.params.movie_id }, function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Movie deleted' });
        });
    });

router.route('/upload')
    .post(function(req, res){
        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            var file = files.file[0];
            fs.readFile(file.path, 'utf8', (err, data) => {
                parseMovies(data, (movies) => {
                    var newMovies = [];
                    movies.forEach((movie) => {
                        var newMovie = new Movie(movie);
                        newMovie.save((err, inserted) => {
                            if (err)
                                throw err;
                        });
                        newMovies.push(newMovie);
                    });
                    console.log(newMovies);
                    res.json(newMovies);
                });
            });
        });
    });

module.exports = router;
