import React from 'react';

import { Box, Flex, Heading, Image, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { useMovieDetails } from '@/features/movies/service';

const PageMovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();

  if (!movieId) {
    return <div>Invalid movie ID</div>;
  }
  const { data: movie, isLoading } = useMovieDetails(movieId);

  if (isLoading) {
    return <Spinner />;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }
  console.log(movie);
  return (
    <Box>
      <Heading>{movie.name}</Heading>
      <Image src={movie.imageUrl} alt={movie.name} />

      <Flex>Release Date: {movie.publishDate}</Flex>
      <Flex>Duration: {movie.duration} minutes</Flex>
      <Flex>Language: {movie.language}</Flex>
      <Flex>Description: {movie.description}</Flex>
    </Box>
  );
};

export default PageMovieDetails;
