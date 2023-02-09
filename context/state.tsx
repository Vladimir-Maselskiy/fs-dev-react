import { IFSet } from '@/interfaces/interfaces';
import { createContext, useContext, useState } from 'react';

type Props = {
  children?: JSX.Element;
};

interface IContext {
  fSetsArray: IFSet[];
  setFSetsArray: React.Dispatch<
    React.SetStateAction<IFSet[]>
  >;
}

const FSetsContext = createContext<IContext | null>(null);

export function AppWrapper({ children }: Props) {
  const [fSetsArray, setFSetsArray] = useState<IFSet[]>([]);
  let sharedState = {
    fSetsArray,
    setFSetsArray,
  };

  return (
    <FSetsContext.Provider value={sharedState}>
      {children}
    </FSetsContext.Provider>
  );
}

export function useFSetsContext() {
  const context = useContext(FSetsContext);
  if (!context) {
    throw new Error(
      'useFSetsContext has to be used within <useFSetsContext.Provider>'
    );
  }
  return context;
}
