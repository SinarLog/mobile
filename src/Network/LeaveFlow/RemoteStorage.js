import sinarlogClient from "../SinarlogClient"

export function postRequestLeave(leaveData) {
    return new Promise((resolve, reject) => {
        sinarlogClient.post('/empl/leaves/report',JSON.stringify(leaveData))
        .then((res) => resolve(res.data.data))
        .catch((err) => reject(err))
    })
}

export function postApplyLeave(bodyFormData) {
    return new Promise((resolve, reject) => {
        sinarlogClient({
            method: 'post',
            url: '/empl/leaves',
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response.data.error.errors)) 
    })
}

export function getMyLeaveRequest() {
    return new Promise((resolve, reject) => {
        sinarlogClient.get('/empl/leaves')
        .then((res) => resolve(res.data.data))
        .catch((err) => reject(err.response))
    })
}

export function getLeaveRequestById(id) {
    return new Promise((resolve, reject) => {
        sinarlogClient.get(`/empl/leaves/${id}`)
        .then((res) => resolve(res.data.data))
        .catch((err) => reject(err.response))
    })
}