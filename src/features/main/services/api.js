import axios from 'axios';

import urls from './urls';

const request = axios.create({});

export const fetchMessage = () => request.get(urls.request('message/fetch'));

export default { fetchMessage };
