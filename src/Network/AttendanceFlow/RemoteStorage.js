import { setClockIn } from "../../LocalStorage/AttendanceData"
import sinarlogClient from "../SinarlogClient"

export function getClockIn() {
    return new Promise((resolve, reject) => {
        sinarlogClient.get('/empl/attendances/clockin')
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response.data.error))
    })
}

export function postClockIn(clockInData) {
    return new Promise((resolve, reject) => {
        sinarlogClient.post('/empl/attendances/clockin',JSON.stringify(clockInData))
        .then(async (res) => {
            await setClockIn()
            resolve(res.data)
        })
        .catch((err) => reject(err))
    })
}