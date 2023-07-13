import sinarlogClient from "../SinarlogClient"

export function getAnalytics() {
    return new Promise((resolve, reject) => {
        sinarlogClient.get('/empl/anal/dashboard')
        .then((res) => resolve(res.data.data))
        .catch((err) => reject(err.response))
    })
}