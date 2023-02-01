import axios from 'axios';
type Resp = {
  data: { currentRate: string };
};

export const getCurrentRate = async (): Promise<
  Resp | undefined
> => {
  try {
    const result = await axios.get(
      'https://scrapper-fs-dev.onrender.com/api/rate'
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
