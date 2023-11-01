import { IFSet } from '@/interfaces/interfaces';
import { getGorizontalLocksRC } from '../maco/rc/getGorizontalLocksRC';
import { getGorizontalLocks } from '../maco/getGorizontalLocks';
import { getVerticalLocksRC } from '../maco/rc/getVerticalLocksRC';
import { getVerticalLocks } from '../maco/getVerticalLocks';

export const getDefaultVerticalLock = (fSet: IFSet) => {
  const [defaultVerticalLock] = fSet.isAntiBreakingOpen
    ? getVerticalLocksRC(fSet)
    : getVerticalLocks(fSet);

  return defaultVerticalLock;
};
