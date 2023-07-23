import sinarlogClient from "../SinarlogClient"

export function getAnalytics() {
    const result = sinarlogClient.get('/empl/anal/dashboard')
    return result
}