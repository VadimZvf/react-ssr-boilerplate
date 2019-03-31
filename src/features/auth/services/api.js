import axios from 'axios';

import urls from './urls';

const request = axios.create({});

export const login = data => request.post(urls.request('login'), { ...data });

export default { login };
