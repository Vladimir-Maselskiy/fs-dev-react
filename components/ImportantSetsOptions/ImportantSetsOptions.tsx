import { IFSet } from '@/interfaces/interfaces';
import React from 'react';
import { Box } from '../Box/Box';

type TProps = {
  fSet: IFSet;
};

export const ImportantSetsOptions = ({ fSet }: TProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={10}
      >
        {fSet.typeOfOpening !== 'type-3' && (
          <>
            <p>Сторона петель:</p>
            <Box
              display="flex"
              width={160}
              justifyContent="space-between"
            >
              <label>
                <input
                  type="radio"
                  name={`side-of-hinge-${fSet.id}`}
                  value="left"
                />
                Ліворуч
              </label>
              <label>
                <input
                  type="radio"
                  name={`side-of-hinge-${fSet.id}`}
                  value="right"
                  defaultChecked={true}
                />
                Праворуч
              </label>
            </Box>
          </>
        )}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        width={260}
        mt={10}
      >
        <label htmlFor="size">Профільна система</label>
        <select>
          <option value="13" defaultChecked={true}>
            13-та серія
          </option>
          <option value="9">9-та серія</option>
          <option value="Salamander">Salamander(13)</option>
          <option value="Rehau">Rehau(13)</option>
          <option value="Veka">Veka(13)</option>
        </select>
      </Box>
    </Box>
  );
};
