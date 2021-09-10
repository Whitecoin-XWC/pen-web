import { Message } from 'element-ui'

export default function ({ app, redirect, store }) {
  // app.$axios.defaults.withCredentials = true
  // app.$axios.defaults.baseURL = process.env.baseUrl
  // Request interception
  app.$axios.interceptors.request.use(
    (request) => {
      const { headers = {} } = request
      return {
        ...request,
        headers: {
          ...headers,
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
    },
    (error) => {
      return Promise.reject(error)
    },
  )
  // Response interception
  app.$axios.interceptors.response.use(
    (response) => {
      if (response.status === 200) {
        if (response.data.code === '900') {
          redirect('/login')
          return Promise.reject(response.data)
        } else {
          return Promise.resolve(response.data)
        }
      } else {
        Message({
          showClose: true,
          center: true,
          type: 'error',
          message: 'server error',
        })
        return Promise.reject(response.data)
      }
    },
    (error) => {
      Message({
        showClose: true,
        center: true,
        type: 'error',
        message: 'network error',
      })
      return Promise.reject(error)
    },
  )
}
