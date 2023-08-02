import { useEffect, useState } from "react"
import { getEmployeesList, getEmployeesListAsEmployee } from "../../Network/EmployeeFlow/RemoteStorage"
import { getUserDefault } from "../../LocalStorage/UserDefault"
import PATH from "../../Navigator/PathNavigation"

const EmployeeModel = ({ navigation }) => {
    const [employeeList, setEmployeeList] = useState([])

    const [search, setSearch] = useState(false)
    const [input, setInput] = useState('')

    const [openJobType, setopenJobType] = useState(false)
    const [value, setValue] = useState()
    const [items, setItems] = useState([
        {label: 'All', value: 'all'},
        {label: 'Product Manager', value: 'd7012dff-9efa-4861-86ba-0f5c15882a1a'},
        {label: 'UI/UX Designer', value: 'f2ee9eff-13da-487b-b633-5237940ceb90'},
        {label: 'Software Developer', value: 'e40e3073-3a47-4008-a9c6-a6d3c84572d9'},
        {label: 'Business Analyst', value: '0cbea1bc-3071-4908-984b-8d54c3a16342'},
        {label: 'Data Analyst', value: '1097694d-b05e-4550-b033-3e034d5c1bf2'},
        {label: 'Data Scientist', value: 'd6c2ee5c-6248-4045-96a7-41175d7b4c7a'},
        {label: 'Human Resource', value: '13a99e06-0696-4246-8dd6-2f7d79dd3336'},
    ])

    useEffect(() => {
        loadData()
    },[])

    const loadData = async () => {
        try {
            const dataUser = await getUserDefault()

            let data
            if (dataUser.role.code === 'mngr') {
                data = await getEmployeesList()
            } else {
                data = await getEmployeesListAsEmployee()
            }

            if (data) {
                data = data.map(item => {
                    if (item.status === 'UNAVAILABLE') {
                        return {
                            ...item,
                            color: '#A3A3A3'
                        }
                    } else if (item.status === "AVAILABLE") {
                        return {
                            ...item,
                            color: '#4BB543'
                        }
                    } else if (item.status === "RESIGN") {
                        return {
                            ...item,
                            color: '#E54646'
                        }
                    }
                    else {
                        return {
                            ...item,
                            color: '#F0AD4E'
                        }
                    }
                })
                setEmployeeList(data)
            } else {
                setEmployeeList([])
            }
        } catch (error) {
            console.log('Error get employees list', error);
        }
    }

    const loadDataWithFilter = async () => {
        try {
            const dataUser = await getUserDefault()

            let data
            if (dataUser.role.code === 'mngr') {
                data = await getEmployeesList(value, input)
            } else {
                data = await getEmployeesListAsEmployee(value, input)
            }

            if (data) {
                data = data.map(item => {
                    if (item.status === 'UNAVAILABLE') {
                        return {
                            ...item,
                            color: '#A3A3A3'
                        }
                    } else if (item.status === "AVAILABLE") {
                        return {
                            ...item,
                            color: '#4BB543'
                        }
                    } else if (item.status === "RESIGN") {
                        return {
                            ...item,
                            color: '#E54646'
                        }
                    }
                    else {
                        return {
                            ...item,
                            color: '#F0AD4E'
                        }
                    }
                })
                setEmployeeList(data)
            } else {
                setEmployeeList([])
            }

        } catch (error) {
            console.log('Error get employees list', error);
        }
    }

    const handleDetailEmployee = async (id) => {
        const dataUser = await getUserDefault()

        if (dataUser.role.code === 'mngr') {
            navigation.navigate(PATH.employeeDetail, { id })
        }
    }

    const searchView = {
        search,
        input, 
        setSearch,
        setInput
    }

    const dropdown = {
        openJobType,
        value,
        items,
        setopenJobType,
        setValue,
        loadDataWithFilter
    }

    return {
        employeeList,
        searchView,
        dropdown,
        handleDetailEmployee
    }
}

export default EmployeeModel