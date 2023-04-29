export const createError = (status: number, message: string) => {
  const error = new Error(message);
  error.cause = status;
  return error;
};
