const Movie = require('../models/movie');
const User = require('../models/user');

exports.addMovieToList = async (req, res, next) => {
  const movieToAdd = new Movie.MovieModel(req.body.movie);
  const userDoc = await User.findOne({ email: req.user.email });

  if (!userDoc.watchList) {
    userDoc.watchList = [];
  }

  const existingMovie = userDoc.watchList.find(
    (movie) => movie.id === movieToAdd.id
  );

  if (existingMovie) {
    return res.status(422).send({ error: 'Movie already on list' });
  }

  userDoc.watchList.push(movieToAdd);
  await userDoc.save();
  return res.status(201).send();
};

exports.getWatchList = async (req, res, next) => {
  const userDoc = await User.findOne({ email: req.user.email });
  return res.status(200).json({
    movies: userDoc.watchList,
    watchListCount: userDoc.watchList.length,
  });
};
