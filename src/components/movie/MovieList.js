import React from 'react';
import styled from 'styled-components';
import MovieCard from './MovieCard';
import Loading from '../common/Loading';

const ListContainer = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #e94560;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #a0a0a0;
`;

const MovieList = ({ 
  title, 
  movies = [], 
  loading = false, 
  error = null,
  emptyMessage = 'Không có phim nào để hiển thị' 
}) => {
  if (loading) {
    return (
      <ListContainer>
        {title && <Title>{title}</Title>}
        <Loading />
      </ListContainer>
    );
  }

  if (error) {
    return (
      <ListContainer>
        {title && <Title>{title}</Title>}
        <EmptyState>
          <p>{error}</p>
        </EmptyState>
      </ListContainer>
    );
  }

  if (movies.length === 0) {
    return (
      <ListContainer>
        {title && <Title>{title}</Title>}
        <EmptyState>
          <p>{emptyMessage}</p>
        </EmptyState>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {title && <Title>{title}</Title>}
      <Grid>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </ListContainer>
  );
};

export default MovieList;