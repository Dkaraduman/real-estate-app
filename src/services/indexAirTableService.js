import axios from 'axios';
const apiKey = process.env.VUE_APP_AIR_TABLE_API_KEY || '';
const instance = axios.create();

instance.interceptors.request.use((config) => {
  config.baseURL = 'https://api.airtable.com/v0/appkTtnhXACqj0kag/';
  config.headers.Authorization = `Bearer ${apiKey}`;
  return config;
});

instance.interceptors.response.use(res => res, err => err);
export default () => instance;
