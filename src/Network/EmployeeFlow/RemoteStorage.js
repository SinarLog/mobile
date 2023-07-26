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