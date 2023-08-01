import { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import { useCallback, useMemo, useRef, useState, useEffect } from "react"
import { getIncomingOvertimeSubmissionByID, getOvertimeSubmissionHistoryByID, patchOvertimesubmission } from "../../Network/ApprovalFlow/RemoteStorage"
import { getUserDefault } from "../../LocalStorage/UserDefault"

const IncomingOvertimeDetailModel = ({ navigation, route }) => {
    const { id, isFromHistory } = route.params
    const [userData, setUserData] = useState({})
    const [ overtimeDetail, setOvertimeDetail] = useState([])

    useEffect(() => {
        getUserData()
        loadData()
    },[])

    const loadData = async () => {
        try {
            let data 
            if (isFromHistory) {
                data = await getOvertimeSubmissionHistoryByID(id)
            } else {
                data = await getIncomingOvertimeSubmissionByID(id)
            }
            console.log(data);
            setOvertimeDetail([data])
        } catch (error) {
            console.log('Error get Overtime Detail', error);
        }
    }

    const getUserData = async () => {
        try {
            const data = await getUserDefault()
            setUserData({...userData, ...data})
        } catch (error) {
            console.log('Error get user default', error);
        }
    }

    const [status, setStatus] = useState('pending')
    const [reason, setReason] = useState('')

    const bottomSheetReject = useRef(null)
    const snapPoints = useMemo(() => ['25%','40%','70%','100%'],[])
    const renderBackdrop = useCallback( 
        props => (
            <BottomSheetBackdrop
            {...props}
            appearsOnIndex={1}
            disappearsOnIndex={0}
        />
        )
    ,[])
    const handlebottomSheetRejectDismiss = useCallback(() => {
        bottomSheetReject.current?.dismiss()
    },[])
    const handleRejectButton = () => {
        bottomSheetReject.current?.present()
    }
    const handleRejectSubmit = () => {
        setStatus('rejected')
        bottomSheetReject.current?.dismiss()
    }
    const handleSubmitButton = async () => {
        try {
            let overtimeData = {
                id: id,
                reason: reason
            }
            if (status === 'rejected') {
                overtimeData = {...overtimeData, approved: false}
            } else {
                overtimeData = {...overtimeData, approved: true}
            }
            await patchOvertimesubmission(overtimeData)
            navigation.goBack()
        } catch (error) {
            console.log('Error Patch Overtime Proposal', error);
        }
    }

    const buttonStatus = {
        status,
        setStatus,
    }

    const bottomSheet = {
        bottomSheetReject,
        snapPoints,
        reason,
        handleRejectButton,
        handleRejectSubmit,
        handlebottomSheetRejectDismiss,
        renderBackdrop,
        setReason,
    }

    return {
        userData,
        overtimeDetail,
        buttonStatus,
        bottomSheet,
        handleSubmitButton
    }
}

export default IncomingOvertimeDetailModel