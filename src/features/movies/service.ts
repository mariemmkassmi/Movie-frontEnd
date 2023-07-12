import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import config from 'next/config';

import { Movie, MovieList, zMovie, zMovieList } from '@/features/movies/schema';

const MOVIES_BASE_URL = '/movies';

const moviesKeys = createQueryKeys('moviesService', {
  movies: () => ['movies'],
  movie: (params: { movieId?: string }) => [params],
  movieForm: null,
});

export const useMovieList = (queryOptions: UseQueryOptions<MovieList> = {}) => {
  const query = useQuery({
    queryKey: moviesKeys.movies().queryKey,
    queryFn: async () => {
      const response = await axios.get(MOVIES_BASE_URL);
      console.log(response.data, 'teste');
      return zMovieList().parse({
        movies: response.data,
      });
    },
    keepPreviousData: true,
    ...queryOptions,
  });
  const movies = query.data?.movies;
  const isLoadingPage = query.isFetching;
  console.log(movies);
  return {
    movies,
    isLoadingPage,
    ...query,
  };
};
//movie updated
export const useMovieUpdate = (
  movieId: string,
  config: UseMutationOptions<Movie, AxiosError, Movie> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload) => {
      const response = await axios.put(
        `${MOVIES_BASE_URL}/${movieId}`,
        payload
      );
      return zMovie().parse(response.data);
    },
    {
      ...config,
      onSuccess: (data, payload, ...args) => {
        queryClient.cancelQueries(moviesKeys.movies._def);
        queryClient
          .getQueryCache()
          .findAll(moviesKeys.movies._def)
          .forEach(({ queryKey }) => {
            queryClient.setQueryData<MovieList | undefined>(
              queryKey,
              (cachedData) => {
                if (!cachedData) return;
                return {
                  ...cachedData,
                  content: (cachedData || []).map((movie) =>
                    movie.id === data.id ? data : movie
                  ),
                };
              }
            );
          });
        queryClient.invalidateQueries(moviesKeys.movies._def);
        if (config.onSuccess) {
          config.onSuccess(data, payload, ...args);
        }
      },
    }
  );
};
export const useMovieFormQuery = (
  movieId?: string,
  queryOptions: UseQueryOptions<Movie> = {}
) =>
  useMovie(movieId, {
    queryKey: moviesKeys.movieForm.queryKey,
    staleTime: Infinity,
    cacheTime: 0,
    ...queryOptions,
  });
export const useMovie = (
  movieId?: string,
  queryOptions: UseQueryOptions<Movie> = {}
) => {
  return useQuery({
    queryKey: moviesKeys.movie({}).queryKey,
    queryFn: async () => {
      const response = await axios.get(`${MOVIES_BASE_URL}/${movieId}`);
      return zMovie().parse(response.data);
    },
    ...queryOptions,
  });
};

export const useMovieCreate = (
  config?: UseMutationOptions<
    Movie,
    AxiosError,
    Pick<
      Movie,
      | 'name'
      | 'description'
      | 'language'
      | 'imageUrl'
      | 'publishDate'
      | 'membreStaffs'
      | 'categories'
    >
  >
) => {
  const queryClient = useQueryClient();
  return useMutation<
    Movie,
    AxiosError,
    Pick<
      Movie,
      | 'name'
      | 'description'
      | 'language'
      | 'imageUrl'
      | 'publishDate'
      | 'membreStaffs'
      | 'categories'
    >
  >(
    (payload) => {
      return axios.post('/movies', payload);
    },
    {
      ...config,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(moviesKeys.movies._def);
        if (config?.onSuccess) {
          config.onSuccess(data, variables, context);
        }
      },
    }
  );
};

// movie Details
export function useMovieDetails(
  movieId: string,
  queryOptions: UseQueryOptions<Movie> = {}
) {
  return useQuery<Movie>({
    queryKey: moviesKeys.movie({ movieId }).queryKey,
    queryFn: async () => {
      const response = await axios.get(`${MOVIES_BASE_URL}/${movieId}`);
      return zMovie().parse(response.data);
    },
    ...queryOptions,
  });
}
