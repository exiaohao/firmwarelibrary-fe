import axios from 'axios'

// create an axios instance
const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const { code, message, data } = response.data
        // if the custom code is not 20000, it is judged as an error.
        if (code !== 200) {
            Message({
                message: message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(message || 'Error'))
        } else {
            return data
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service