import { z } from 'zod';

export const zRole = () => z.enum(['Director', 'Author', 'Actor']);

export const zStaff = () =>
  z.object({ role: zRole(), firstName: z.string(), lastName: z.string() });

export const zCategory = () =>
  z.object({
    name: z.string(),
    description: z.string(),
  });

export type Movie = z.infer<ReturnType<typeof zMovie>>;
export const zMovie = () =>
  z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    duration: z.string().nullish(),
    language: z.string().nullish(),
    imageUrl: z.string(),
    publishDate: z.string().nullish(),
    membreStaffs: z.array(zStaff()).nullish(),
    categories: z.array(zCategory()).nullish(),
  });

export const zMovieList = () =>
  z.object({
    movies: z.array(zMovie()),
  });
export type MovieList = z.infer<ReturnType<typeof zMovieList>>;
