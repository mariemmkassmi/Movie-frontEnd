import { createQueryKeys } from '@lukemorales/query-key-factory';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Movie, MovieList, zMovieList } from '@/features/movies/schema';

const MOVIES_BASE_URL = '/movies';

const moviesKeys = createQueryKeys('moviesService', {
  movies: () => ['movies'],
  movie: (params: { movieId?: string }) => [params],
  movieForm: null,
});

export const useMovieList = (queryOptions: UseQueryOptions<MovieList> = {}) => {
  return useQuery({
    queryKey: moviesKeys.movies().queryKey,
    queryFn: async () => {
      const response = await axios.get(MOVIES_BASE_URL);
      return zMovieList().parse(response.data);
    },
    keepPreviousData: true,
    ...queryOptions,
  });
};
