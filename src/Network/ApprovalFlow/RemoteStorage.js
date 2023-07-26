import sinarlogClient from "../SinarlogClient"

export async function getLeaveProposalHistory(size, name, status, month, year, sort) {
    let params = {}
    if (size) {
        params = {...params, size: size}
    }
    if (name) {
        params = {...params, name: name}
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
    if (sort) {
        if (sort === 'Ascending') {
            params = {...params, sort: 'ASC'}
        } else {
            params = {...params, sort: 'DESC'}
        }
    }
    const result = await sinarlogClient.get('/mngr/proposals/leaves/history', {
        params: params
    })
    return result
}

export async function getLeaveProposalHistoryByID(id) {
    const result = await sinarlogClient.get(`/mngr/proposals/leaves/history/${id}`)
    return result
}

export async function getIncomingLeaveProposal(size, name, month, year, sort) {
    let params = {}
    if (size) {
        params = {...params, size: size}
    }
    if (name) {
        params = {...params, name: name}
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
    const result = await sinarlogClient.get('/mngr/proposals/leaves/incoming', {
        params: params  
    })
    return result
}

export async function getIncomingLeaveProposalByID(id) {
    const result = await sinarlogClient.get(`/mngr/proposals/leaves/incoming/${id}`)
    return result
}

export async function patchLeaveProposal(leaveData) {
    const result = await sinarlogClient.patch(`/mngr/proposals/leaves/incoming`, JSON.stringify(leaveData))
    return result
}

export async function getOvertimeSubmissionHistory(size, name, sort, status, month, year) {
    let params = {}
    if (size) {
        params = {...params, size: size}
    }
    if (name) {
        params = {...params, name: name}
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
    if (sort) {
        if (sort === 'Ascending') {
            params = {...params, sort: 'ASC'}
        } else {
            params = {...params, sort: 'DESC'}
        }
    }
    const result = await sinarlogClient.get('/mngr/proposals/overtimes/history', {
        params: params
    })
    return result
}

export async function getOvertimeSubmissionHistoryByID(id) {
    const result = await sinarlogClient.get(`/mngr/proposals/overtimes/history/${id}`)
    return result
}

export async function getIncomingOvertimeSubmission(size, name, sort) {
    let params = {}
    if (size) {
        params = {...params, size: size}
    }
    if (name) {
        params = {...params, name: name}
    }
    if (sort) {
        if (sort === 'Ascending') {
            params = {...params, sort: 'ASC'}
        } else {
            params = {...params, sort: 'DESC'}
        }
    }
    const result = await sinarlogClient.get('/mngr/proposals/overtimes/incoming', {
        params: params  
    })
    return result
}

export async function getIncomingOvertimeSubmissionByID(id) {
    const result = await sinarlogClient.get(`/mngr/proposals/overtimes/incoming/${id}`)
    return result
}

export async function getStaffAttendanceHistory(size, name, status, month, year) {
    let params = {}
    if (size) {
        params = {...params, size: size}
    }
    if (name) {
        params = {...params, name: name}
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
    const result = await sinarlogClient.get('/mngr/attendances/history', { params: params })
    return result
}