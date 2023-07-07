import React from 'react';

import {
  Badge,
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
} from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import { Link, useSearchParams } from 'react-router-dom';

import { Page, PageContent } from '@/components/Page';
import { ResponsiveIconButton } from '@/components/ResponsiveIconButton';
import { SearchInput } from '@/components/SearchInput';
import { AdminNav } from '@/features/admin/AdminNav';
import { useMovieList } from '@/features/movies/service';

const mockImage =
  'https://catimage.net/images/2023/07/07/The-Out-Laws-2023-Hindi-Dubbed-HDRip-Full-Movie-HDHub4u.jpg';

const movieGenreMock = [
  { name: 'Science fiction' },
  { name: 'Thriller1' },
  { name: 'Thriller2' },
  { name: 'Thriller3' },
  { name: 'Thriller4' },
  { name: 'Thriller5' },
];
export default function PageMovies() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: movies, isLoading } = useMovieList();
  console.log({ movies });
  const handleChange = (value: string) => {
    setSearchParams({ search: value });
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
              Ajouter Movie
            </ResponsiveIconButton>
          </HStack>

          <Flex flexDir="column" gap="6">
            <SearchInput
              value={searchParams?.get('search') ?? ''}
              onChange={handleChange}
            />
            <Flex gap="4" flexWrap="wrap">
              {movies?.map((movie) => (
                <Flex key={movie.id} gap="2" flexDir="column" maxW="300px">
                  <Image
                    src={mockImage}
                    alt={movie.name}
                    maxW="300px"
                    borderRadius="lg"
                    boxShadow="lg"
                  />
                  <Heading fontSize="xl" textAlign="center">
                    {movie.name}
                  </Heading>
                  <Flex gap="2" justifyContent="center" flexWrap="wrap">
                    {(movie?.categories || movieGenreMock)?.map((category) => (
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
