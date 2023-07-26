import React from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';
import {
  Page,
  PageBottomBar,
  PageContent,
  PageTopBar,
} from '@/components/Page';
import { useToastError, useToastSuccess } from '@/components/Toast';
import {
  useMovieDelete,
  useMovieFormQuery,
  useMovieUpdate,
} from '@/features/movies/service';
import { Loader } from '@/layout/Loader';

import { MovieForm } from './MovieForm';
import { Movie } from './schema';

export default function PageMovieUpdate() {
  const { t } = useTranslation(['common', 'users']);
  const params = useParams();
  const navigate = useNavigate();

  const movie = useMovieFormQuery(params.id);
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const movieUpdate = useMovieUpdate(params.id || '', {
    onSuccess: () => {
      toastSuccess({
        title: 'Movie update is done',
      });
      navigate('../');
    },
  });
  const movieDelete = useMovieDelete(params.id || '', {
    onSuccess: () => {
      toastSuccess({
        title: 'Movie has been deleted successfully',
      });
      navigate('../');
    },
    onError: () => {
      toastError({
        title: 'Failed to delete the movie',
      });
    },
  });
  const form = useForm<Omit<Movie, 'id'>>({
    ready: !movie.isLoading,
    initialValues: movie.data,
    onValidSubmit: (values) => {
      if (!movie.data?.id) return null;

      movieUpdate.mutate({ id: movie.data.id, ...values });
    },
  });

  return (
    <Page containerSize="md" isFocusMode>
      <PageTopBar showBack onBack={() => navigate('../')}>
        <HStack spacing="4">
          <Box flex="1">
            {movie.isLoading || movie.isError ? (
              <SkeletonText maxW="6rem" noOfLines={2} />
            ) : (
              <Stack spacing="0">
                <Heading size="sm">{movie.data?.id}</Heading>
                <Text
                  fontSize="xs"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  {movie.data?.id}
                </Text>
              </Stack>
            )}
          </Box>
        </HStack>
      </PageTopBar>
      {movie.isLoading && <Loader />}
      {movie.isError && <ErrorPage errorCode={404} />}
      {movie.isSuccess && (
        <Formiz connect={form}>
          <form noValidate onSubmit={form.submit}>
            <PageContent>
              <MovieForm />
            </PageContent>
            <PageBottomBar>
              <ButtonGroup justifyContent="space-between">
                <Button onClick={() => navigate('../')}>Back</Button>
                <Button
                  type="submit"
                  variant="@primary"
                  isLoading={movieUpdate.isLoading}
                >
                  Update Movie
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this movie?'
                      )
                    ) {
                      movieDelete.mutate();
                    }
                  }}
                  isLoading={movieDelete.isLoading}
                >
                  Delete Movie
                </Button>
              </ButtonGroup>
            </PageBottomBar>
          </form>
        </Formiz>
      )}
    </Page>
  );
}
