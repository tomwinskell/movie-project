'use client';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  addMovieToWatchList,
  removeMovieFromWatchList,
} from '../store/slices/watchListSlice';
import useWatchListMovies from '../hooks/useWatchListMovies';

const WatchListButton = ({ movie }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const { watchListMovies } = useWatchListMovies();

  const watchlistIncludesMovie = useMemo(
    () => watchListMovies.some((m) => m.id === movie.id),
    [watchListMovies, movie.id]
  );

  if (!authenticated) {
    return <button disabled>Login to add to Watchlist</button>;
  }

  const handleClick = () => {
    if (watchlistIncludesMovie) {
      dispatch(removeMovieFromWatchList(movie));
    } else {
      dispatch(addMovieToWatchList(movie));
    }
    router.push('/watch-list');
  };

  return (
    <button onClick={handleClick}>
      {watchlistIncludesMovie ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </button>
  );
};

export default WatchListButton;
