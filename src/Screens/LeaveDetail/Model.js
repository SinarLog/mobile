import { getLeaveRequestById } from "../../Network/LeaveFlow/RemoteStorage"
import { useEffect, useState, useCallback } from "react"
import { Linking } from "react-native"
import PATH from "../../Navigator/PathNavigation"
import { getUserDefault } from "../../LocalStorage/UserDefault"

const LeaveDetailModel = ({ navigation, route }) => {
    const { id } = route.params
    const [leaveDetail, setLeaveDetail] = useState({})

    useEffect(() => {
        handleLoadDetail()
    },[])

    const handleBackButton = () => {
        navigation.goBack()
    }

    const handleLoadDetail = async () => {
        try {
            const userData = await getUserDefault()
            let result = await getLeaveRequestById(id)

            let view = ''
            if (userData.role.name === 'Manager') {
                if (result.status === 'APPROVED') {
                    view = 'approved'
                } else if (result.status === 'PENDING') {
                    view = 'pending'
                } else if (result.status === 'REJECTED') {
                    view = 'rejected'
                } else {
                    view = 'closed'
                }
            } else {
                if (result.status === 'REJECTED') {
                    if (result.approvedByManager) {
                        view = 'rejectedHR'
                    } else {
                        view = 'rejected'
                    }
                } else if (result.status === 'PENDING') {
                    if (result.approvedByManager) {
                        view = 'approvedManager'
                    } else if (!result.approvedByManager) {
                        view = 'pending'
                    } 
                } else if (result.status === 'APPROVED') {
                    view = 'approvedHR'
                } else {
                    if (result.approvedByManager) {
                        view = 'approveClosed'
                    }
                    view = 'closed'
                }
            }
            result = {...result, view: view}
            setLeaveDetail({...leaveDetail, ...result})
        } catch (error) {
            console.log('Error get leave request by id', error);
        }
    }

    const handleLinkAttachment = useCallback( async () => {
        try {
            await Linking.canOpenURL(leaveDetail.attachmentUrl)
            await Linking.openURL(leaveDetail.attachmentUrl)
        } catch (error) {
            console.log('Error Link attachment url',error);
        }
    },[leaveDetail])

    const handleDetailChild = (id) => {
        navigation.navigate(PATH.detailLeave, {id, userData})
    }

    return {
        leaveDetail,
        handleBackButton,
        handleLinkAttachment,
        handleDetailChild
    }
}

export default LeaveDetailModel