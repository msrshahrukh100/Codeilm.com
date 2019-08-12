import axios from 'axios'

// baseURL: 'http://localhost:8000/android/gymapp/api/'
// baseURL: 'https://allywith.com/android/gymapp/api/'

const debug = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"

const instance = axios.create({
  baseURL: debug ? 'https://codeilm.com/api/v1/tutorials/' : 'https://codeilm.com/api/v1/tutorials/'
})

export default instance
