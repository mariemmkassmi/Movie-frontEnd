import React from 'react';

import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { BsStopwatch } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Icon } from '@/components/Icons';
import { Page, PageTopBar } from '@/components/Page';
import { useMovieDetails } from '@/features/movies/service';

const convertDuration = (duration: string) => {
  const minutes = parseInt(duration.slice(2, -1));
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return { hours, minutes: remainingMinutes };
};

const PageMovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();

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

  const descriptionLines = movie.description.split('\n');
  const { hours, minutes } = convertDuration(movie.duration);
  const hasHours = hours > 0;

  return (
    <Page>
      <PageTopBar showBack onBack={() => navigate('../')}>
        <Flex>
          <Text fontWeight="bold" marginRight="10px" fontSize="22px">
            {movie.name}
          </Text>
          {movie.categories?.map((category) => (
            <Badge key={category.name} colorScheme="brand">
              {category.name}
            </Badge>
          ))}
        </Flex>
      </PageTopBar>
      <Flex
        direction="row"
        alignItems="center"
        marginLeft="400px"
        marginRight="400px"
      >
        <Image src={movie.imageUrl} alt={movie.name} h="300px" />
        <Box p="2" ml="4">
          {hasHours && (
            <>
              <Icon
                icon={BsStopwatch}
                fontWeight="bold"
                mt="2"
                fontSize="16px"
              />
              <Box marginBottom="10px">{`${hours} h ${minutes} min`}</Box>
            </>
          )}

          {!hasHours && (
            <>
              <Icon
                icon={BsStopwatch}
                fontWeight="bold"
                mt="2"
                fontSize="16px"
              />
              <Box marginBottom="10px">{`${minutes} min`}</Box>
            </>
          )}
          {movie.membreStaffs?.map((staff, index) => (
            <Box key={index}>
              <Box fontWeight="bold" mt="2" fontSize="13px" color="#7E8897">
                {staff.role}
              </Box>
              <Box
                fontWeight="bold"
                mt="2"
                fontSize="16px"
              >{`${staff.firstName} ${staff.lastName}`}</Box>
            </Box>
          ))}
          <Box fontWeight="bold" mt="2" fontSize="13px" color="#7E8897">
            Synopsis
          </Box>
          {descriptionLines.map((line, index) => (
            <Box
              key={index}
              wordBreak="break-word"
              fontSize="16px"
              fontWeight="bold"
            >
              {line}
            </Box>
          ))}
          <Button
            as={Link}
            to={`/movies/update/${movieId}`}
            colorScheme="blue"
            marginLeft="auto"
          >
            Edit
          </Button>
        </Box>
      </Flex>
    </Page>
  );
};

export default PageMovieDetails;
