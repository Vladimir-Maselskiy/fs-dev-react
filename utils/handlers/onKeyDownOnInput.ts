export const onKeyDownOnInput = (
  e: React.KeyboardEvent<HTMLInputElement>,
  widthRef: React.RefObject<HTMLInputElement>,
  heightRef: React.RefObject<HTMLInputElement>,
  refName: string
) => {
  if (e.key !== 'Enter') return;
  if (refName === 'width') {
    widthRef.current?.blur();
    heightRef.current?.focus();
  }
  if (refName === 'height') {
    heightRef.current?.blur();
  }
};
