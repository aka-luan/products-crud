import axios from 'axios'

/* criação da lib axios p realizar requisições http em nosso fake server*/
export const api = axios.create({
  baseURL: 'https://localhost:3000/api'
})