export const onChangeCounterByInput = (
    e: React.FormEvent<HTMLInputElement>,
    toFixed: number,
    setValue: (newValue: string) => void
  ) => {
    const data = e.currentTarget.value;
    if (data === '') {
      setValue('0');
      return;
    }

    if (data.length > toFixed && data[0] === '0') {
      const newValue = data.slice(1);
      setValue(newValue);
      return;
    }

    if (+data >= 0 && data.length <= toFixed) {
      setValue(data);
      return;
    }
  };