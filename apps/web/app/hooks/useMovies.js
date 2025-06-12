import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../store/slices/moviesSlice';
import { useState } from 'react';

const useMovies = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const totalPages = useSelector((state) => state.movies.total_pages);

  return {
    loadItems: () => {
      if (page < totalPages || totalPages === 0) {
        setPage(page + 1);
        dispatch(fetchMovies(page + 1));
      } else {
        setHasMoreItems(false);
      }
    },
    hasMoreItems,
    movies: useSelector((state) => state.movies.movies),
    getMovies: (page) => dispatch(fetchMovies(page)),
  };
};

export default useMovies;
