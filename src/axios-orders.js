import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-a4da4.firebaseio.com/'
})

export default instance;