import { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import { useCallback, useMemo, useRef, useState, useEffect } from "react"
import { getIncomingLeaveProposalByID, getLeaveProposalHistoryByID } from "../../Network/ApprovalFlow/RemoteStorage"
import { getUserDefault } from "../../LocalStorage/UserDefault"

const IncomingLeaveDetailModel = ({ navigation, route }) => {
    const { id, isFromHistory } = route.params
    const [userData, setUserData] = useState({})
    const [leaveDetail, setLeaveDetail] = useState([])

    useEffect(() => {
        getUserData()
        loadData()
    },[])

    const loadData = async () => {
        try {
            let data 
            if (isFromHistory) {
                data = await getLeaveProposalHistoryByID(id)
            } else {
                data = await getIncomingLeaveProposalByID(id)
            }
            console.log(data);
            if (data) {
                let view = ''
                if (data.status === 'REJECTED') {
                    if (data.approvedByManager) {
                        view = 'rejectedHR'
                    } else {
                        view = 'rejected'
                    }
                } else if (data.status === 'PENDING') {
                    if (data.approvedByManager) {
                        view = 'approvedManager'
                    } else if (!data.approvedByManager) {
                        view = 'pending'
                    } 
                } else if (data.status === 'APPROVED') {
                    view = 'approvedHR'
                } else {
                    if (data.approvedByManager) {
                        view = 'approveClosed'
                    }
                    view = 'closed'
                }
                data = {...data, view: view}
                setLeaveDetail([data])
            }
        } catch (error) {
            console.log('Get Leave detail by ID', error);
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
    const [statusParent, setStatusParent] = useState('pending')

    const [reason, setReason] = useState('')
    const [reasonParent, setReasonParent] = useState('')

    const bottomSheetReject = useRef(null)
    const bottomSheetRejectParent = useRef(null)

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
    const handlebottomSheetRejectParentDismiss = useCallback(() => {
        bottomSheetRejectParent.current?.dismiss()
    },[])

    const handleRejectButton = () => {
        bottomSheetReject.current?.present()
    }
    const handleRejectParentButton = () => {
        bottomSheetRejectParent.current?.present()
    }

    const handleRejectSubmit = () => {
        setStatus('rejected')
        bottomSheetReject.current?.dismiss()
    }
    const handleRejectParentSubmit = () => {
        setStatusParent('rejected')
        bottomSheetRejectParent.current?.dismiss()
    }

    const buttonStatus = {
        status,
        statusParent,
        setStatus,
        setStatusParent
    }

    const bottomSheet = {
        bottomSheetReject,
        bottomSheetRejectParent,
        snapPoints,
        reason,
        reasonParent,
        handleRejectButton,
        handleRejectParentButton,
        handleRejectSubmit,
        handleRejectParentSubmit,
        handlebottomSheetRejectDismiss,
        handlebottomSheetRejectParentDismiss,
        renderBackdrop,
        setReason,
        setReasonParent
    }

    return {
        userData,
        leaveDetail,
        buttonStatus,
        bottomSheet
    }
}

export default IncomingLeaveDetailModel