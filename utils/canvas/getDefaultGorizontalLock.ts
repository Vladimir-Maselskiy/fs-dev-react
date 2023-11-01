import { IFSet } from '@/interfaces/interfaces';
import { getGorizontalLocksRC } from '../maco/rc/getGorizontalLocksRC';
import { getGorizontalLocks } from '../maco/getGorizontalLocks';

export const getDefaultGorizontalLock = (fSet: IFSet) => {
  const [defaultGorizontalLock] = fSet.isAntiBreakingOpen
    ? getGorizontalLocksRC(fSet)
    : getGorizontalLocks(fSet);

  return defaultGorizontalLock;
};
