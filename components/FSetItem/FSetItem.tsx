import { IFSet } from '@/interfaces/interfaces';
import { Box } from '../Box/Box';
import {
  StyledFSetItem,
  StyledInput,
} from './FSetItem.styled';

interface IProp {
  fSet: IFSet;
}

export const FSetItem = ({ fSet }: IProp) => {
  return (
    <StyledFSetItem>
      <Box display="flex" flexDirection="column">
        <label className="label">
          Ширина
          <StyledInput type="number" />
        </label>

        <label>
          Висота
          <input
            type="number"
            className="size-input"
            data-input="height"
          />
        </label>

        <div>
          <p>Кількість</p>

          <button type="button" data-action="decrement">
            <svg
              className="counter-button__icon"
              data-action="decrement"
            >
              <use
                href="/symbol-defs.769bc48b.svg#icon-minus"
                data-action="decrement"
              ></use>
            </svg>
          </button>

          <span
            data-value="value"
            className="counter-value"
          >
            1
          </span>

          <button type="button" data-action="increment">
            <svg
              className="counter-button__icon"
              data-action="increment"
            >
              <use
                className="counter-button_icon__icon"
                href="/symbol-defs.769bc48b.svg#icon-plus"
                data-action="increment"
              ></use>
            </svg>
          </button>
        </div>

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
