import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { FaStar, FaClock, FaCalendarAlt } from 'react-icons/fa';
import Button from '../common/Button';

const Container = styled.div`
  display: flex;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PosterContainer = styled.div`
  width: 300px;
  flex-shrink: 0;
  margin-right: 2rem;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1.5rem;
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  color: #a0a0a0;
`;

const InfoIcon = styled.span`
  margin-right: 10px;
  color: #e94560;
  display: flex;
  align-items: center;
`;

const GenresContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  gap: 8px;
`;

const GenreBadge = styled.span`
  background: #e94560;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

const Description = styled.div`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const MovieDetail = ({ movie, onBookTicket }) => {
  if (!movie) return null;

  return (
    <Container>
      <PosterContainer>
        <Poster src={movie.poster} alt={movie.title} />
      </PosterContainer>
      
      <Content>
        <Title>{movie.title}</Title>
        
        <InfoGrid>
          <InfoItem>
            <InfoIcon><FaStar /></InfoIcon>
            <div>{movie.rating}/10</div>
          </InfoItem>
          
          <InfoItem>
            <InfoIcon><FaClock /></InfoIcon>
            <div>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</div>
          </InfoItem>
          
          <InfoItem>
            <InfoIcon><FaCalendarAlt /></InfoIcon>
            <div>{format(new Date(movie.releaseDate), 'dd/MM/yyyy')}</div>
          </InfoItem>
        </InfoGrid>
        
        <GenresContainer>
          {movie.genre.map((genre, index) => (
            <GenreBadge key={index}>{genre}</GenreBadge>
          ))}
        </GenresContainer>
        
        <Description>{movie.description}</Description>
        
        <ButtonContainer>
          <Button 
            variant="primary" 
            size="large" 
            onClick={onBookTicket}
          >
            Đặt vé ngay
          </Button>
          
          <Button 
            variant="outline" 
            size="large"
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`}
            target="_blank"
          >
            Xem trailer
          </Button>
        </ButtonContainer>
      </Content>
    </Container>
  );
};

export default MovieDetail;