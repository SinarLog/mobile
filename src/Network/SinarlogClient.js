const { default: axios } = require("axios")

const baseUrl = "http://localhost:8081/api/v2"

const sinarlogClient = axios.create({
    baseURL: baseUrl
})

export default sinarlogClient