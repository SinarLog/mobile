import sinarlogClient from "../SinarlogClient"

export function getWhosTakingLeave() {
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    console.log(month,year);
    return new Promise((resolve, reject) => {
        sinarlogClient.get('/empl/employees/whos-taking-leave', {
            params: {
                month: month.toString(),
                year: year.toString(),
                version: 'mobile'
            }
        })
        .then((res) => resolve(res.data.data))
        .catch((err) => reject(err.response))
    })
}