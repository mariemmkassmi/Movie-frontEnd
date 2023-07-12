import React from 'react';

import { Card, CardBody, Stack } from '@chakra-ui/react';
import { isMinLength } from '@formiz/validations';
import { isNumber } from '@formiz/validations';
import { useTranslation } from 'react-i18next';

import { FieldDayPicker } from '@/components/FieldDayPicker';
import { FieldInput } from '@/components/FieldInput';
import { FieldMultiSelect } from '@/components/FieldMultiSelect';
import { FieldSelect } from '@/components/FieldSelect';
import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE_KEY,
} from '@/lib/i18n/constants';

export const MovieForm = () => {
  const { t } = useTranslation(['common', 'movie']);

  return (
    <Card>
      <CardBody>
        <Stack spacing={4}>
          <FieldInput
            name="name"
            label={'name'}
            required={'required'}
            validations={[
              {
                handler: isMinLength(2),
              },
            ]}
          />
          <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
            {/* <FieldInput
          flexWrap="wrap"
            name="categories"
            label={"categories"}
            required={"required"}
            validations={[
              {
                handler: isMinLength(4)
                
              }
            ]}
          /> */}
            /
            {/* <FieldInput
          flexWrap="wrap"
            name="membreStaffs"
            label={"membreStaffs"}
           
          /> */}
          </Stack>
          <Stack>
            <FieldInput
              name="description"
              label={'description'}
              required={'required'}
              validations={[
                {
                  handler: isMinLength(10),
                },
              ]}
            />
          </Stack>

          <Stack>
            <FieldInput
              name="imageUrl"
              label={'imageUrl'}
              required={'required'}
            />
          </Stack>
          {/* <Stack>
            <FieldInput
              name="publishDate"
              label={'publishDate'}
              required={'required'}
            />
          </Stack> */}
          <Stack>
            <FieldInput
              name="duration"
              label={'duration'}
              required={'required'}
              validations={[
                {
                  handler: isNumber(),
                  message: 'Please enter a valid number',
                },
              ]}
            />
          </Stack>
          <FieldSelect
            name="langKey"
            label={'Languge'}
            options={AVAILABLE_LANGUAGES.map(({ key }) => ({
              label: t(`common:languages.${key}`),
              value: key,
            }))}
            defaultValue={DEFAULT_LANGUAGE_KEY}
          />
        </Stack>
      </CardBody>
    </Card>
  );
};
