import axios from 'axios'

// baseURL: 'http://localhost:8000/android/gymapp/api/'
// baseURL: 'https://allywith.com/android/gymapp/api/'
const instance = axios.create({
  baseURL: '/api/v1'
})

export default instance
