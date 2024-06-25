import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL

const backend = axios.create({
    baseURL: baseURL + '/api/v1'
})

export { backend }