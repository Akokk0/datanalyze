import axios from "axios";

const request = axios.create({
    baseURL: 'http://akokko.com:20002',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

export default request
