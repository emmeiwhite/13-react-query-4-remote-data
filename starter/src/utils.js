import axios from 'axios'

const fetchCustom = axios.create({
  baseURL: 'http://localhost:5000/api/tasks'
})

export default fetchCustom
