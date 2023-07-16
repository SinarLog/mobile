import { setClockIn, setclockout } from "../../LocalStorage/AttendanceData"
import sinarlogClient from "../SinarlogClient"

export function getMyOvertimeSubmissions() {
    return new Promise((resolve, reject) => {
        sinarlogClient.get('/empl/overtimes')
        .then((res) => resolve(res.data.data))
        .catch((err) => reject(err.response))
    })
}

export function getClockIn() {
    return new Promise((resolve, reject) => {
        sinarlogClient.get('/empl/attendances/clockin')
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response.data.error.errors[0].message))
    })
}

export function postClockIn(clockInData) {
    return new Promise((resolve, reject) => {
        sinarlogClient.post('/empl/attendances/clockin',JSON.stringify(clockInData))
        .then(async (res) => {
            await setClockIn()
            resolve(res)
        })
        .catch((err) => reject(err.response.data.error.errors[0].message))
    })
}

export function getClockOut() {
    return new Promise((resolve, reject) => {
        sinarlogClient.get('/empl/attendances/clockout')
        .then((res) => resolve(res.data.data))
        .catch((err) => reject(err.response.data.error.errors[0].message))
    })
}

export function postClockOut(clockOutData) {
    return new Promise((resolve, reject) => {
        sinarlogClient.post('/empl/attendances/clockout', JSON.stringify(clockOutData))
        .then(async (res) => {
            await setclockout()
            resolve(res.data)
        })
        .catch((err) => reject(err.response.data.error.errors[0].message))
    })
}