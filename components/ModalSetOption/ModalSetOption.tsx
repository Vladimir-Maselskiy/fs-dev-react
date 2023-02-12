import { useFSetsContext } from '@/context/state';
import { getSetById } from '@/utils/getSetById';
import React from 'react';
import { Box } from '../Box/Box';

type TProps = {
  id: string;
};

export const ModalSetOption = ({ id }: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();

  const fSet = getSetById(id, fSetsArray);
  return (
    <Box mt={10}>
      <p>Додаткові опції комплекта:</p>
      <Box pt={20}>
        <p>Ширина: {fSet?.width}</p>
        <p>Висота: {fSet?.height}</p>
      </Box>
      <Box>
        <form>
          <div data-title="enter data" data-select="select">
            <label>
              Висота від низу до ручки
              <input
                type="number"
                data-input="handle-distance"
                data-title="enter data"
                placeholder={String(
                  Number(fSet?.height) / 2
                )}
              />
            </label>
            <div>enter data</div>
          </div>

          <label data-select="select">
            Поворотно-відкидний привід(покращений прижим)
            <input
              type="checkbox"
              name="turn-tilt-getriebe-type-2"
              value="turn-tilt-getriebe-type-2"
            />
          </label>
          <div data-select="select">
            <p>Штульп:</p>
            <label>
              <input
                type="radio"
                name="shtulp-radio"
                value="getriebe"
                defaultChecked
              />
              привод
            </label>
            <label>
              <input
                type="radio"
                name="shtulp-radio"
                value="latch"
              />
              шпінгалети
            </label>
          </div>
          <label htmlFor="hingeSide" data-select="select">
            Прижим зі сторони петель
            <select>
              <option value="hingeSide-type-1">
                1шт - накладний
              </option>
              <option
                value="hingeSide-type-2"
                defaultChecked
              >
                2шт - накладний
              </option>
              <option value="hingeSide-type-3">
                1шт - фальц. петля нерег.
              </option>
              <option value="hingeSide-type-4">
                2шт - фальц. петля нерег.
              </option>
              <option value="hingeSide-type-5">
                1шт - фальц. петля рег.
              </option>
              <option value="hingeSide-type-6">
                2шт - фальц. петля рег.
              </option>
              <option value="hingeSide-type-7">
                Без прижиму
              </option>
            </select>
          </label>
          <label data-select="select">
            Зимове провітрювання
            <input
              type="checkbox"
              name="micro-ventilation"
              value="micro-ventilation"
              defaultChecked
            />
          </label>
          <label data-select="select">
            Нижній горизонтальний прижим
            <input
              type="checkbox"
              name="bottom-horizontal-lock"
              value="bottom-horizontal-lock"
            />
          </label>
          <label data-select="select">
            Без нижньої петлі
            <input
              type="checkbox"
              name="without-bottom-hing"
              value="without-bottom-hing"
            />
          </label>
        </form>
      </Box>
    </Box>
  );
};
