import sinarlogClient from "../SinarlogClient"

export async function getMyOvertimeSubmissions(size, status, month, year) {
    let params = {}
    if (size) {
        params = {...params, size: size}
    }
    if (status) {
        params = {...params, status: status.toLowerCase()}
    }
    if (month) {
        params = {...params, month: month}
    }
    if (year) {
        params = {...params, year: year}
    }
    const result = await sinarlogClient.get('/empl/overtimes', { params: params })
    return result
}

export async function getMyOvertimeSubmissionsByID(id) {
    const result = await sinarlogClient.get(`/empl/overtimes/${id}`)
    return result
}

export async function getMyAttendancesLog(size, status, month, year) {
    let params = {}
    if (size) {
        params = {...params, size: size}
    }
    if (status) {
        if (status.includes('Early Clock Out')) {
            params = {...params, early: true}
        }
        if (status.includes('Late Clock In')) {
            params = {...params, late: true}
        }
        if (status.includes('Closed')) {
            params = {...params, closed: true}
        }
    }
    if (month) {
        params = {...params, month: month}
    }
    if (year) {
        params = {...params, year: year}
    }
    console.log(params);
    const result = await sinarlogClient.get('/empl/attendances/history', { params: params })
    return result
}

export async function getTodaysAttendance() {
    const result = await sinarlogClient.get('/empl/attendances/active')
    return result
}

export async function getClockIn() {
    const result = await sinarlogClient.get('/empl/attendances/clockin')
    return result
}

export async function postClockIn(clockInData) {
    const result = await sinarlogClient.post('/empl/attendances/clockin',JSON.stringify(clockInData))
    return result
}

export async function getClockOut() {
    const result = await sinarlogClient.get('/empl/attendances/clockout')
    return result
}

export async function postClockOut(clockOutData) {
    const result = await sinarlogClient.post('/empl/attendances/clockout', JSON.stringify(clockOutData))
    return result
}