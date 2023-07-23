import { useEffect, useState } from "react"
import { getMyOvertimeSubmissionsByID } from "../../Network/AttendanceFlow/RemoteStorage"

const OvertimeDetailModel = ({ navigation, route }) => {
    const { id } = route.params
    const [overtimeDetail, setOvertimeDetail] = useState({})

    const handleBackButton = () => {
        navigation.goBack()
    }

    const handleOvertimeDetail = async () => {
        try {
            const data = await getMyOvertimeSubmissionsByID(id)
            if (data) {
                setOvertimeDetail({...overtimeDetail, ...data})
            }
        } catch (error) {
            console.log('Error Get My overtime submissions by ID', error);
        }
    }

    useEffect(() => {
        handleOvertimeDetail()
    },[])

    return {
        overtimeDetail,
        handleBackButton
    }
}

export default OvertimeDetailModel