import axios from 'axios'

const api = axios.create({
    baseURL: 'https://deezefyapi.azurewebsites.net/api'
})

export default api