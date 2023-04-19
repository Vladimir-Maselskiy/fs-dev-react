import axios from 'axios';
type Resp = {
  data: { euroRate: string };
};

export const getCurrentEuroRate = async (): Promise<Resp | undefined> => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/scrapper`
    );
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
