import sinarlogClient from "../SinarlogClient"

export async function postLogin(loginData) {
    const result = await sinarlogClient.post('/credentials/login', JSON.stringify(loginData))
    return result
}

