import sinarlogClient from "../SinarlogClient"

export async function getProfile() {
    const result = await sinarlogClient.get('/profile')
    return result
}

export async function getChangeLogs() {
    const result = await sinarlogClient.get('/profile/logs', {params: {size: 999999}})
    return result
}

export async function updateProfile(profileData) {
    const result = await sinarlogClient.patch('/profile', JSON.stringify(profileData))
    return result
}

export async function updatePassword(passwordData) {
    const result = await sinarlogClient.patch('/profile/update-password', JSON.stringify(passwordData))
    return result
}