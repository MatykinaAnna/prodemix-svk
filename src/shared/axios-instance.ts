import axios from 'axios'

export const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //baseURL: 'https://10.0.23.82:7178',
})
