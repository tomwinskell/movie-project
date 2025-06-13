'use client';
import React from 'react';
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

  const watchlistIncludesMovie = watchListMovies.some(
    (movieOnList) => movieOnList.id === movie.id
  );

  if (authenticated) {
    return watchlistIncludesMovie ? (
      <button
        onClick={() => {
          dispatch(removeMovieFromWatchList(movie));
          router.push('/watch-list');
        }}
      >
        Remove from Watchlist
      </button>
    ) : (
      <button
        onClick={() => {
          dispatch(addMovieToWatchList(movie));
          router.push('/watch-list');
        }}
      >
        Add to Watchlist
      </button>
    );
  } else {
    return null;
  }
};

export default WatchListButton;
