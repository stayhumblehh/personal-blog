import axios  from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

export default request