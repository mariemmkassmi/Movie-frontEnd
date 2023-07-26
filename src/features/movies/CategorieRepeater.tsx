import React from 'react';

import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Stack } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
// Import Select
import { useCollection } from '@formiz/core';

import { FieldInput } from '@/components/FieldInput';

const CategorieRepeater = () => {
  const collection = useCollection({
    name: 'categories',
  });

  return (
    <>
      <Box>
        {collection.keys.map((key, index) => (
          <Stack
            key={key}
            direction="row"
            spacing="4"
            mb="6"
            data-test={`repeater-item[${index}]`}
          >
            <Box flex="1">
              <FieldInput
                name={`categories[${index}].name`}
                label="name"
                required="Required"
                m="0"
              />
            </Box>
            <Box flex="1">
              <FieldInput
                name={`categories[${index}].description`}
                label="description"
                m="0"
              />
            </Box>

            <Box pt="1.75rem">
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                onClick={() => collection.remove(index)}
                variant="ghost"
              />
            </Box>
          </Stack>
        ))}
      </Box>

      <Box>
        <Button
          size="sm"
          onClick={() => collection.append({ name: '', description: '' })}
        >
          Add Categorie
        </Button>
      </Box>
    </>
  );
};

export default CategorieRepeater;
