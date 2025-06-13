'use client';
import { useEffect } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import Movie from './components/Movie';
import { v4 as uuidv4 } from 'uuid';
import useMovies from './hooks/useMovies';

export default function Home() {
  const { loadItems, hasMoreItems, movies, getMovies } = useMovies();
  useEffect(() => {
    getMovies(1);
  });

  return (
    <Container>
      <InfiniteScroll
        dataLength={movies.length}
        next={loadItems}
        hasMore={hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        <MovieGrid>
          {movies.map((mv) => {
            return (
              <Movie
                id={mv.id}
                key={uuidv4()}
                title={mv.title}
                img={mv.poster_path}
                url={`/${mv.id}`}
              />
            );
          })}
        </MovieGrid>
      </InfiniteScroll>
    </Container>
  );
}

const MovieGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2em;
  margin: 0 auto;
`;

const Container = styled.div`
  overflow-y: auto;
`;
