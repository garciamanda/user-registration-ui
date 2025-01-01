import axios from "axios"

const api = axios.create({
    baseURL: 'https://api-register-users.up.railway.app'
});

export default api