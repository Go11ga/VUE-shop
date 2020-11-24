import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://faceprog.ru/reactcourseapi/',
    timeout: 10000
});

export default instance;
