import React from 'react';

import { Badge, Flex, HStack, Heading, Image, Stack } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import { Link, useSearchParams } from 'react-router-dom';

import { Page, PageContent } from '@/components/Page';
import { ResponsiveIconButton } from '@/components/ResponsiveIconButton';
import { SearchInput } from '@/components/SearchInput';
import { useMovieList, useMovieSearch } from '@/features/movies/service';

import { MovieList } from './schema';

const movieGenreMock = [
  { name: 'Science fiction' },
  { name: 'Thriller1' },
  { name: 'Thriller2' },
];

export default function PageMovies() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('search') || '';

  const { movies, isLoading: isLoadingMovies } = useMovieList();
  const { data: searchResults, isLoading: isLoadingSearch } =
    useMovieSearch(searchTerm);

  const shouldShowSearchResults =
    !!searchTerm && !isLoadingSearch && !!searchResults?.movies;

  const handleChange = (value: string) => {
    const params = new URLSearchParams();
    params.set('search', value);
    setSearchParams(params);
  };

  return (
    <Page containerSize="xl">
      <PageContent>
        <Stack spacing={4}>
          <HStack spacing={4}>
            <Heading size="md" flex="1">
              Movies
            </Heading>

            <ResponsiveIconButton
              as={Link}
              to="/movies/create"
              variant="@primary"
              icon={<LuPlus />}
            >
              Create a new Movie
            </ResponsiveIconButton>
          </HStack>

          <Flex flexDir="column" gap="6">
            <SearchInput
              value={searchTerm}
              onChange={handleChange}
              placeholder="search By name,year,genre,director,actors...."
            />
            <Flex gap="4" flexWrap="wrap">
              {shouldShowSearchResults
                ? searchResults?.movies.map((movie) => (
                    <Flex key={movie.id} gap="2" flexDir="column" maxW="300px">
                      <Image
                        src={movie.imageUrl}
                        alt={movie.name}
                        h="300px"
                        borderRadius="lg"
                        boxShadow="lg"
                      />
                      <Heading fontSize="xl" textAlign="center">
                        {movie.name}
                      </Heading>
                      <Flex gap="2" justifyContent="center" flexWrap="wrap">
                        {movie.categories?.map((category) => (
                          <Badge key={category.name} colorScheme="brand">
                            {category.name}
                          </Badge>
                        ))}
                      </Flex>
                    </Flex>
                  ))
                : movies?.map((movie) => (
                    <Flex key={movie.id} gap="2" flexDir="column" maxW="300px">
                      <Image
                        src={movie.imageUrl}
                        alt={movie.name}
                        h="300px"
                        borderRadius="lg"
                        boxShadow="lg"
                      />
                      <Heading
                        fontSize="xl"
                        textAlign="center"
                        as={Link}
                        to={`/movies/details/${movie.id}`}
                      >
                        {movie.name}
                      </Heading>
                      <Flex gap="2" justifyContent="center" flexWrap="wrap">
                        {movie.categories?.map((category) => (
                          <Badge key={category.name} colorScheme="brand">
                            {category.name}
                          </Badge>
                        ))}
                      </Flex>
                    </Flex>
                  ))}
            </Flex>
          </Flex>
        </Stack>
      </PageContent>
    </Page>
  );
}
