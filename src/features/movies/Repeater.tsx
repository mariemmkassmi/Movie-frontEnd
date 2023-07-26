import React from 'react';

import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Stack } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
// Import Select
import { useCollection } from '@formiz/core';

import { FieldInput } from '@/components/FieldInput';

const Repeater = () => {
  const collection = useCollection({
    name: 'membreStaffs',
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
                name={`membreStaffs[${index}].firstName`}
                label="First Name"
                required="Required"
                m="0"
              />
            </Box>
            <Box flex="1">
              <FieldInput
                name={`membreStaffs[${index}].lastName`}
                label="Last Name"
                required="Required"
                m="0"
              />
            </Box>
            <Box flex="1">
              {/* Use Chakra UI's Select */}
              {/* <Select
                name={`membreStaffs[${index}].role`}
                placeholder="Select a role"
                required
              >
                <option value="Director">Director</option>
                <option value="Author">Author</option>
                <option value="Actor">Actor</option>
              </Select> */}
              <FieldInput
                name={`membreStaffs[${index}].role`}
                label="role"
                required="Required"
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
          onClick={() =>
            collection.append({ firstName: '', lastName: '', role: 'Director' })
          }
        >
          Add Staff Member
        </Button>
      </Box>
    </>
  );
};

export default Repeater;
