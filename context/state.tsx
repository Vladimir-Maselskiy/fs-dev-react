import { IArticleItem, IFSet, IUser } from '@/interfaces/interfaces';
import { createContext, useContext, useState } from 'react';

type Props = {
  children?: JSX.Element;
};

interface IFSetContext {
  fSetsArray: IFSet[];
  setFSetsArray: React.Dispatch<React.SetStateAction<IFSet[]>>;
}
interface ITableContext {
  tableItems: IArticleItem[];
  setTableItems: React.Dispatch<React.SetStateAction<IArticleItem[]>>;
}
interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const FSetsContext = createContext<IFSetContext | null>(null);
const TableItemsContext = createContext<ITableContext | null>(null);
const UserContext = createContext<IUserContext | null>(null);

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
export function TableWrapper({ children }: Props) {
  const [tableItems, setTableItems] = useState<IArticleItem[]>([]);
  let sharedState = {
    tableItems,
    setTableItems,
  };

  return (
    <TableItemsContext.Provider value={sharedState}>
      {children}
    </TableItemsContext.Provider>
  );
}

export function UserWrapper({ children }: Props) {
  const [user, setUser] = useState<IUser | null>(null);
  let sharedState = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
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
export function useTableItemsContext() {
  const context = useContext(TableItemsContext);
  if (!context) {
    throw new Error(
      'useTableContext has to be used within <useTableContext.Provider>'
    );
  }
  return context;
}
export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      'useUserContext has to be used within <useUserContext.Provider>'
    );
  }
  return context;
}
