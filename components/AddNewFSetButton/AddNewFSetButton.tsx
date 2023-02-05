type TProp = {
  children: string;
  addNewFSet: () => void;
};

export const AddNewFSetButton = ({
  children,
  addNewFSet,
}: TProp) => {
  return <button onClick={addNewFSet}>{children}</button>;
};
