import React from 'react';

import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Page,
  PageBottomBar,
  PageContent,
  PageTopBar,
} from '@/components/Page';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { MovieForm } from '@/features/movies/MovieForm';
import { Movie } from '@/features/movies/schema';
import { useMovieCreate } from '@/features/movies/service';

export default function PageMovieCreate() {
  const navigate = useNavigate();
  const toastError = useToastError();
  const toastSuccess = useToastSuccess();
  const createMovie = useMovieCreate({
    onSuccess: () => {
      toastSuccess({
        title: 'Movie created successfully!',
      });
      navigate('../');
    },
    // onError: (error) => {
    //   if (error.response) {
    //     const { title, errorKey } = error.response.data;
    //     toastError({
    //       title: 'Error creating movie',
    //       description: title,
    //     });
    //     switch (errorKey) {
    //       case 'movieexists':

    //         break;

    //       default:
    //         break;
    //     }
    //   } else {
    //     toastError({
    //       title: 'Error creating movie',
    //       description: 'An unexpected error occurred.',
    //     });
    //   }
    // },
  });

  const form = useForm<
    Pick<
      Movie,
      | 'name'
      | 'description'
      | 'imageUrl'
      | 'publishDate'
      | 'membreStaffs'
      | 'categories'
      | 'duration'
      | 'language'
    >
  >({
    onValidSubmit: (values) => {
      const newMovie = {
        ...values,
        duration: parseInt(values.duration || '0'),
        description: values.description || '',
        language: values.language || null,
        imageUrl: values.imageUrl || '',
        publishDate: values.publishDate || '',
      };
      createMovie.mutate(newMovie);
    },
  });

  return (
    <Page containerSize="md" isFocusMode>
      <Formiz connect={form}>
        <form noValidate onSubmit={form.submit}>
          <PageTopBar showBack onBack={() => navigate('../')}>
            <Heading size="md">Create Movie</Heading>
          </PageTopBar>
          <PageContent>
            <MovieForm />
          </PageContent>
          <PageBottomBar>
            <ButtonGroup justifyContent="space-between">
              <Button onClick={() => navigate('../')}>Cancel</Button>
              <Button
                type="submit"
                variant="@primary"
                isLoading={createMovie.isLoading}
              >
                Save
              </Button>
            </ButtonGroup>
          </PageBottomBar>
        </form>
      </Formiz>
    </Page>
  );
}
