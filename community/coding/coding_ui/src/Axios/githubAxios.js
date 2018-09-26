import axios from 'axios'


const axiosInst = axios.create({
  baseURL: 'https://api.github.com/users/'
})

axiosInst.defaults.headers.common['Authorization'] = 'token 54cd4d47187da0e9e6f0eaa64682c7b2bf6ddf9a'


export default axiosInst
