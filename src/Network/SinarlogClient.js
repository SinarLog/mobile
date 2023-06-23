import { getUserDefault } from "../LocalStorage/UserDefault"

const { default: axios } = require("axios")

const baseUrl = "http://10.0.2.2:8079/api/v2"

const sinarlogClient = axios.create({
    baseURL: baseUrl
})

sinarlogClient.interceptors.request.use( async (config) => {
    const userData = await getUserDefault()

    if (config.url !== '/credentials/login') {
        config.headers['Authorization'] = `Bearer ${userData.accessToken}`
    }
    return config
})

export default sinarlogClient