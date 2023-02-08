import { useState } from 'react';
import { IFSet } from '@/interfaces/interfaces';
import {
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { Box } from '../Box/Box';
import {
  StyledButton,
  StyledFSetItem,
  StyledInput,
  StyledLabel,
  StyledSetsCounter,
} from './FSetItem.styled';
import { ControlButtons } from '../СontrolButtons/СontrolButtons';

interface IProp {
  fSet: IFSet;
}

export const FSetItem = ({ fSet }: IProp) => {
  const [
    isOptitionButtonDisabled,
    setIsOptitionButtonDisabled,
  ] = useState(true);
  const [counter, setCounter] = useState<string>(
    fSet.quantitySet
  );
  const [width, setWidth] = useState<string>(fSet.width);
  const [height, setHeight] = useState<string>(fSet.height);

  const onChangeCounterByClick = (num: number): void => {
    if (+counter <= 0 && num < 0) return;
    if (+counter >= 99 && num > 0) return;
    setCounter(prev => String(+prev + num));
  };

  const onChangeCounterByInput = (
    e: React.FormEvent<HTMLInputElement>,
    toFixed: number,
    setValue: (newValue: string) => void
  ) => {
    const data = e.currentTarget.value;
    if (data === '') {
      setValue('0');
      return;
    }

    if (data.length > toFixed && data[0] === '0') {
      const newValue = data.slice(1);
      setValue(newValue);
      return;
    }

    if (+data >= 0 && data.length <= toFixed) {
      setValue(data);
      return;
    }
  };

  return (
    <StyledFSetItem>
      <Box>
        <StyledLabel>
          Ширина
          <StyledInput
            type="number"
            value={width}
            onChange={e =>
              onChangeCounterByInput(e, 4, setWidth)
            }
          />
        </StyledLabel>

        <StyledLabel>
          Висота
          <StyledInput
            type="number"
            value={height}
            onChange={e =>
              onChangeCounterByInput(e, 4, setHeight)
            }
          />
        </StyledLabel>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={160}
        >
          <p>Кількість</p>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <StyledButton
              type="button"
              onClick={() => onChangeCounterByClick(-1)}
            >
              <AiOutlineMinus
                size={40}
                color="var(--accent-color)"
              />
            </StyledButton>
            <StyledSetsCounter
              type="number"
              value={counter}
              onChange={e =>
                onChangeCounterByInput(e, 2, setCounter)
              }
            />
            <StyledButton
              type="button"
              onClick={() => onChangeCounterByClick(1)}
            >
              <AiOutlinePlus
                size={40}
                color="var(--accent-color)"
              />
            </StyledButton>
          </Box>
        </Box>
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
              <option value="Salamander">
                Salamander(13)
              </option>
              <option value="Rehau">Rehau(13)</option>
              <option value="Veka">Veka(13)</option>
            </select>
          </Box>
        </Box>
      </Box>
      <ControlButtons
        isOptitionButtonDisabled={isOptitionButtonDisabled}
      />
    </StyledFSetItem>
  );
};
