import axios from 'axios';

export async function getPublicIP() {
  try {
    return axios.get('https://api.ipify.org?format=json').then(res => res.data);
  } catch (error) {
    console.log(error);
    return { ip: '' };
  }
}
