import sinarlogClient from "../SinarlogClient"

export async function getWhosTakingLeave(size) {
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()

    const result = await sinarlogClient.get('/empl/employees/whos-taking-leave', {
                        params: {
                            month: month.toString(),
                            year: year.toString(),
                            version: 'mobile',
                            size: size
                        }
                    })
    return result
}

export async function getEmployeesList(jobId, name) {
    let params = {size: 9999999}
    if (jobId && jobId !== 'all') {
        params = {...params, jobId: jobId}
    }
    if (name) {
        params = {...params, fullName: name}
    }
    const result = await sinarlogClient.get('/mngr/employees',{params: params})
    return result
}

export async function getEmployeeDetail(id) {
    const result = await sinarlogClient.get(`/mngr/employees/${id}`)
    return result
}

export async function getMyEmployeesLeave(id, status, month, year, sort) {
    let params = { size: 999999}

    if (status) {
        params = {...params, status: status.toLowerCase()}
    }
    if (month) {
        params = {...params, month: month}
    }
    if (year) {
        params = {...params, year: year}
    }
    if (sort) {
        if (sort === 'Ascending') {
            params = {...params, sort: 'ASC'}
        } else {
            params = {...params, sort: 'DESC'}
        }
    }

    const result = await sinarlogClient.get(`/mngr/employees/leaves/${id}`, { params: params })
    return result
}

export async function getMyEmployeesOvertime(id, status, sort, month, year) {
    let params = { size: 999999}

    if (status) {
        params = {...params, status: status.toLowerCase()}
    }
    if (month) {
        params = {...params, month: month}
    }
    if (year) {
        params = {...params, year: year}
    }
    if (sort) {
        if (sort === 'Ascending') {
            params = {...params, sort: 'ASC'}
        } else {
            params = {...params, sort: 'DESC'}
        }
    }
    const result = await sinarlogClient.get(`/mngr/employees/overtimes/${id}`, { params: params})
    return result
}

export async function getMyEmployeesAttendance(id, status, month, year) {
    let params = { size: 999999}
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
    const result = await sinarlogClient.get(`/mngr/employees/attendances/${id}`, { params: params})
    return result
}

export async function getEmployeesListAsEmployee(jobId, name) {
    let params = {size: 9999999}
    if (jobId && jobId !== 'all') {
        params = {...params, jobId: jobId}
    }
    if (name) {
        params = {...params, fullName: name}
    }
    const result = await sinarlogClient.get('/empl/employees',{params: params})
    return result
}

export async function getEmployeeDetailAsEmployee(id) {
    const result = await sinarlogClient.get(`/empl/employees${id}`)
    return result
}