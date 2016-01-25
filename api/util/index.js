
const TITLE_PATTERN = 'Title: ';
const YEAR_PATTERN = 'Release Year: ';
const FORMAT_PATTERN = 'Format: ';
const STARS_PATTERN = 'Stars: ';

function parseMovies(data, callback) {
    var cursor = 0;
    var movies = [];
    do {
        var titlePos = data.indexOf(TITLE_PATTERN, cursor);
        var endLinePos = data.indexOf('\n', titlePos);
        var title = data.slice(titlePos + TITLE_PATTERN.length, endLinePos);

        var yearPos = data.indexOf(YEAR_PATTERN, endLinePos);
        endLinePos = data.indexOf('\n', yearPos);
        var year = data.slice(yearPos + YEAR_PATTERN.length, endLinePos);

        var formatPos = data.indexOf(FORMAT_PATTERN, endLinePos);
        endLinePos = data.indexOf('\n', formatPos);
        var format = data.slice(formatPos + FORMAT_PATTERN.length, endLinePos);

        var starsPos = data.indexOf(STARS_PATTERN, endLinePos);
        endLinePos = data.indexOf('\n', starsPos);
        var stars = data.slice(starsPos + STARS_PATTERN.length, endLinePos).split(', ');

        var movie = {
            title: title,
            releaseYear: year,
            format: format,
            actors: stars.map(function(star) {
                return { name: star };
            })
        };
        movies.push(movie);
        console.log(movie);

        cursor = data.indexOf(TITLE_PATTERN, endLinePos);

    } while(cursor != -1);

    callback(movies);
}

module.exports.parseMovies = parseMovies;
