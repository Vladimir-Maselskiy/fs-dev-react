import axios from 'axios';

const SITE = 'https://viknocenter.ua/';

export const getCurrentRate = async (): Promise<string> => {
  try {
    const request = (await axios.get(SITE).then(res => res.data)) as string;
    const resFullString = request;

    const start = resFullString.indexOf('<h3');
    const end = resFullString.indexOf('</h3');

    return resFullString.slice(start, end).split(' ')[3];
  } catch (error: any) {
    return error.message;
  }
};
