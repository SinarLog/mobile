import { useEffect, useState } from "react"
import { getEmployeeDetail } from "../../Network/EmployeeFlow/RemoteStorage"
import { getUserDefault } from "../../LocalStorage/UserDefault"

const EmployeeDetailModel = ({ route }) => {
    const { id } = route.params

    const [userData, setUserData] = useState({})
    const [profile, setProfile] = useState([])

    useEffect(() => {
        loadUserData()
        loadData()
    },[])

    const loadData = async () => {
        console.log(id)
        try {
            const data = await getEmployeeDetail(id)
            let color
            if (data.status === 'UNAVAILABLE') {
                color= '#A3A3A3'
            } else if (data.status === "AVAILABLE") {
                color= '#4BB543'
            } else if (data.status === "RESIGN") {
                color= '#E54646'
            }
            else {
                color= '#F0AD4E'
            }
            const updatedData = {...data, color: color }
            setProfile([updatedData])
        } catch (error) {
            console.log('Error get Employee Details', error)
        }
    }

    const loadUserData = async () => {
        try {
            const data = await getUserDefault()
            setUserData({...userData, ...data})
        } catch (error) {
            console.log('Error get user data', error);
        }
    }

    return {
        userData,
        profile
    }
}

export default EmployeeDetailModel