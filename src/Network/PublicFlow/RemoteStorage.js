import sinarlogClient from "../SinarlogClient";

export async function getJobs() {
    const result = await sinarlogClient.get('/pub/jobs')
    return result
}

export async function postForgotPassword(emailData) {
    const result = await sinarlogClient.post('/pub/forgot-password', JSON.stringify(emailData))
    return result
}