import { IFSet } from '@/interfaces/interfaces';

export const getPVCSystemSelectValue = (
  fset: IFSet | undefined
): { value: string; label: string } | undefined => {
  switch (fset?.systemOfPVC) {
    case '13':
      return { value: '13', label: '13-та серія' };
    case '9':
      return { value: '9', label: '9-та серія' };
    case 'Rehau': {
      return { value: 'Rehau', label: 'Rehau' };
    }
    case 'Salamander': {
      return { value: 'Salamander', label: 'Salamander' };
    }
    case 'Veka': {
      return { value: 'Veka', label: 'Veka/Decco' };
    }
  }
};
