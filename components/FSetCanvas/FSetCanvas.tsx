import { IFSet, IMacoLocks } from '@/interfaces/interfaces';
import React, { useRef, useState, useEffect } from 'react';
import {
  StyledCanvas,
  StyledCanvasLayout,
  StyledCanvasWrapper,
} from './FSetCanvas.styled';
import { drawCanvasContent } from '@/utils/canvas/drawCanvasContent';
import { CanvasGorizontalLock } from './CanvasFElements/CanvasGorizontalLock/CanvasGorizontalLock';
import { CanvasVerticalLock } from './CanvasFElements/CanvasVerticalLock/CanvasVerticalLock';
import { CanvasShear } from './CanvasFElements/CanvasShear/CanvasShear';
import { CanvasFElementsList } from './CanvasFElements/CanvasFElementsList/CanvasFElementsList';
import { CanvasBottomEnd } from './CanvasFElements/CanvasBottomEnd/CanvasBottomEnd';
import data from '../../data/tech/maco-tech.json';
import { useWindowWidth } from '@/hooks';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCanvasOpen: boolean;
};

export type TListFilter = {
  side: 'vertical' | 'gorizontal' | null;
};

export const FSetCanvas = ({
  isCanvasOpen,
  fSet,
  setFSet,
  isListOpen,
  setIsListOpen,
}: TProps) => {
  const { windowWidth } = useWindowWidth();
  const ref = useRef<HTMLCanvasElement>(null);
  const px = 20;
  const py = 20;
  const outterPaddingK = windowWidth >= 480 ? 3.2 : 1.6;

  const macoItems = data as IMacoLocks[];

  const [macoLocks] = useState(macoItems.filter(item => item.usedAsLock));
  const [filteredData, setFilteredData] = useState(macoLocks);

  const [listFilter, setListFilter] = useState<TListFilter>({
    side: null,
  });
  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    drawCanvasContent({ fSet, canvas, px, py });
  }, [fSet]);

  return (
    <StyledCanvasLayout open={isCanvasOpen}>
      <StyledCanvasWrapper style={{ padding: outterPaddingK * px }}>
        <StyledCanvas windowWidth={windowWidth} ref={ref} />
        {fSet.brand === 'maco' &&
          fSet.typeOfOpening === 'type-1' &&
          !fSet.isAntiBreakingOpen && (
            <>
              <CanvasShear
                fSet={fSet}
                setFSet={setFSet}
                outterPadding={px * outterPaddingK}
                setIsListOpen={setIsListOpen}
                setListFilter={setListFilter}
              />
              <CanvasBottomEnd
                fSet={fSet}
                setFSet={setFSet}
                outterPadding={px * outterPaddingK}
                setIsListOpen={setIsListOpen}
                setListFilter={setListFilter}
              />
              <CanvasGorizontalLock
                fSet={fSet}
                setFSet={setFSet}
                outterPadding={px * outterPaddingK}
                setIsListOpen={setIsListOpen}
                setListFilter={setListFilter}
                filteredData={filteredData}
              />
              <CanvasVerticalLock
                fSet={fSet}
                setFSet={setFSet}
                outterPadding={px * outterPaddingK}
                setIsListOpen={setIsListOpen}
                setListFilter={setListFilter}
                filteredData={filteredData}
              />
            </>
          )}
      </StyledCanvasWrapper>
      <CanvasFElementsList
        isListOpen={isListOpen}
        setIsListOpen={setIsListOpen}
        setFSet={setFSet}
        fset={fSet}
        listFilter={listFilter}
        macoLocks={macoLocks}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
      />
    </StyledCanvasLayout>
  );
};
