import sinarlogClient from "../SinarlogClient"

export async function postRequestLeave(leaveData) {
    const result = await sinarlogClient.post('/empl/leaves/report',JSON.stringify(leaveData))
    return result
}

export async function postApplyLeave(bodyFormData) {
    const result = await sinarlogClient({
                            method: 'post',
                            url: '/empl/leaves',
                            data: bodyFormData,
                            headers: { "Content-Type": "multipart/form-data" }
                        })
    return result
}

export async function getMyLeaveRequest(size, status, month, year, sort) {
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
    if (sort) {
        if (sort === 'Ascending') {
            params = {...params, sort: 'ASC'}
        } else {
            params = {...params, sort: 'DESC'}
        }
    }
    console.log(params);
    const result = await sinarlogClient.get('/empl/leaves', {
        params: params
    })
    return result
}

export async function getLeaveRequestById(id) {
    const result = await sinarlogClient.get(`/empl/leaves/${id}`)
    return result
}