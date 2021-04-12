import axios from 'axios';

const BASE_URL = 'http://localhost:4000/';

axios.defaults.baseURL = BASE_URL;

export default axios;
