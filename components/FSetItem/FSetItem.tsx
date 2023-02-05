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

interface IProp {
  fSet: IFSet;
}

export const FSetItem = ({ fSet }: IProp) => {
  const [counter, setCounter] = useState<string>('1');

  const onChangeCounterByClick = (num: number): void => {
    if (+counter <= 0 && num < 0) return;
    if (+counter >= 99 && num > 0) return;
    setCounter(prev => String(+prev + num));
  };

  const onChangeCounterByInput = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const data = e.currentTarget.value;
    if (data === '') {
      setCounter('0');
      return;
    }

    if (data.length > 2 && data[0] === '0') {
      const newValue = data.slice(1);
      setCounter(newValue);
      return;
    }

    if (+data >= +0 && +data <= 99) {
      setCounter(data);
      return;
    }
  };

  return (
    <StyledFSetItem>
      <Box display="flex" flexDirection="column">
        <StyledLabel>
          Ширина
          <StyledInput type="number" />
        </StyledLabel>

        <StyledLabel>
          Висота
          <StyledInput type="number" />
        </StyledLabel>

        <Box width={160}>
          <p>Кількість</p>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
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
              onChange={onChangeCounterByInput}
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

        <div className="required-option">
          <div className="side-of-hinge-radio-block">
            <p className="side-of-hinge-radio-block__label">
              Сторона петель:
            </p>
            <label>
              <input
                type="radio"
                name="side-of-hinge-1"
                className="side-of-hinge-css"
                value="left"
              />
              Ліворуч
            </label>
            <label>
              <input
                type="radio"
                name="side-of-hinge-1"
                className="side-of-hinge-css"
                value="right"
                checked={true}
              />
              Праворуч
            </label>
          </div>
          <div className="system-of-pvc-block">
            <label htmlFor="size">Профільна система</label>
            <select className="select-block">
              <option value="13" selected={true}>
                13-та серія
              </option>
              <option value="9">9-та серія</option>
              <option value="Salamander">
                Salamander(13)
              </option>
              <option value="Rehau">Rehau(13)</option>
              <option value="Veka">Veka(13)</option>
            </select>
          </div>
        </div>

        <div className="remove-option-button-block">
          <button
            type="button"
            className="button-icon type-of-opening"
            data-action="open-second-modal"
          >
            <svg className="button-icon-svg">
              <use href="/symbol-defs.769bc48b.svg#icon-window"></use>
            </svg>
          </button>

          <button
            type="button"
            data-option="1"
            className="button-icon option-button"
            data-action="options"
            disabled={true}
          >
            <svg className="button-icon-svg">
              <use href="/symbol-defs.769bc48b.svg#icon-cogs"></use>
            </svg>
          </button>

          <button
            type="button"
            className="button-icon remote-button"
            data-action="remote"
          >
            <svg className="button-icon-svg">
              <use href="/symbol-defs.769bc48b.svg#icon-bin"></use>
            </svg>
          </button>
        </div>
      </Box>
    </StyledFSetItem>
  );
};
