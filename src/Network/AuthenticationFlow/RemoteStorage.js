import sinarlogClient from "../SinarlogClient"

export function postLogin(loginData) {
    return new Promise((resolve, reject) => {
        sinarlogClient.post('/credentials/login', JSON.stringify(loginData))
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response.data.error.errors[0].message))
    })
}