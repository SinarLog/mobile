import { useEffect, useState } from "react"
import { getUserDefault } from "../../LocalStorage/UserDefault"
import { format } from "date-fns"
import PATH from "../../Navigator/PathNavigation"
import { getLocation } from "../../Geolocation/Location"
import { getClockIn } from "../../Network/AttendanceFlow/RemoteStorage"

const HomeModel = ({ navigation }) => {
    const [userData, setUserData] = useState({})

    const currentDate = new Date()
    const formattedDate = format(currentDate,'EEE d MMM')

    useEffect(()=>{
        async function fetchData() {
            const userDefault = await getUserDefault()
            setUserData({...userData, ...userDefault})
        }
        fetchData()
    },[])

    const handleClockIn = async () => {
        try {
            await getClockIn()
            const position = getLocation()
            navigation.navigate(PATH.OTP, {position})
        } catch (error) {
            console.log('Error Clock In', error);
        }
    }

    const userDetail = [
        {
            id: 0,
            number: 0,
            title: "",
            desc: "days in month"
        },
        {
            id: 1,
            number: 12,
            title: "Late Clock in",
            desc: "days in month"
        },
        {
            id: 2,
            number: 12,
            title: "Early Clock out",
            desc: "days in month"
        },
        {
            id: 3,
            number: 6,
            title: "Paid leave request",
            desc: "days in month"
        },
        {
            id: 4,
            number: 6,
            title: "Unpaid leave request",
            desc: "days in month"
        }
    ]

    const leaveRequest = [
        {
            id: 0,
            leaveType: "Leave type",
            startDate: "Start Date",
            endDate: "End Date",
            duration: "Duration",
            status: "Pending"
        },
        {
            id: 1,
            leaveType: "Leave type",
            startDate: "Start Date",
            endDate: "End Date",
            duration: "Duration",
            status: "Pending"
        },
        {
            id: 2,
            leaveType: "Leave type",
            startDate: "Start Date",
            endDate: "End Date",
            duration: "Duration",
            status: "Pending"
        },
        {
            id: 3,
            leaveType: "Leave type",
            startDate: "Start Date",
            endDate: "End Date",
            duration: "Duration",
            status: "Pending"
        }
    ]

    return {
        userData,
        formattedDate,
        userDetail,
        leaveRequest,
        handleClockIn
    }
}

export default HomeModel