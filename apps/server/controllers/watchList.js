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
exports.removeMovieFromList = async (req, res, next) => {
  const movieIdToRemove = req.body.movie.id;
  const userDoc = await User.findOne({ email: 'tomwinskell@gmail.com' });
  const existingMovie = userDoc.watchList.find(
    (movie) => movie.id === movieIdToRemove
  );

  if (!existingMovie) {
    return res.status(422).send({ error: 'No movie with Id to remove' });
  }

  userDoc.watchList.pull(existingMovie._id);
  await userDoc.save();

  return res.status(204).send();
};
