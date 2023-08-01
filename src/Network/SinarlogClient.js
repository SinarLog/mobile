import { getUserDefault } from "../LocalStorage/UserDefault"

const { default: axios } = require("axios")

const baseUrl = "https://sinarlog-backend-i3odwosdpa-et.a.run.app/api/v2"

const sinarlogClient = axios.create({
    baseURL: baseUrl
})

sinarlogClient.interceptors.request.use( async (config) => {
    const userData = await getUserDefault()

    if (config.url !== '/credentials/login' && config.url !== '/pub/forgot-password') {
        config.headers['Authorization'] = `Bearer ${userData.accessToken}`
    }
    return config
})

sinarlogClient.interceptors.response.use( 
    function (response) {
        return response.data.data
    },
    function (error) {
        return Promise.reject(error.response.data.error.errors[0].message)
    }
)

export default sinarlogClient