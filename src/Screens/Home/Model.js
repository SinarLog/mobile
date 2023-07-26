import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { getUserDefault } from "../../LocalStorage/UserDefault"
import { format } from "date-fns"
import PATH from "../../Navigator/PathNavigation"
import { getLocation } from "../../Geolocation/Location"
import { getClockIn, getClockOut, getMyAttendancesLog, getMyOvertimeSubmissions, getTodaysAttendance, postClockOut } from "../../Network/AttendanceFlow/RemoteStorage"
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import { getAnalytics } from "../../Network/AnalyticsFlow/RemoteStorage"
import { getMyLeaveRequest } from "../../Network/LeaveFlow/RemoteStorage"
import { getWhosTakingLeave } from "../../Network/EmployeeFlow/RemoteStorage"

const HomeModel = ({ navigation }) => {
    const [userData, setUserData] = useState({})
    const [clockIn, setClockIn] = useState(null)
    const [analytics, setAnalytics] = useState({})
    const [leaveRequest, setLeaveRequest] = useState([])
    const [overtimeSubmissions, setOvertimeSubmissions] = useState([])
    const [takingLeaves, setTakingLeaves] = useState([])
    const [attendaceLogs, setAttendanceLogs] = useState([])
    const [reasonOvertime, setReasonOvertime] = useState("")
    const [refreshing, setRefreshing] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const currentDate = new Date()
    const formattedDate = format(currentDate,'EEE d MMM')

    const bottomSheetOvertimeConfirmation = useRef(null)
    const bottonSheetOvertimeReason = useRef(null)
    const bottomSheetSuccess = useRef(null)
    const bottomSheetError = useRef(null)

    const snapPoints = useMemo(() => ['15%','25%','40%','70%'],[])

    const handleModalOvertimeConfirmation = useCallback(() => {
        bottomSheetOvertimeConfirmation.current?.present()
    },[])

    const handleModalOvertimeClose = useCallback(() => {
        bottomSheetOvertimeConfirmation.current?.dismiss()
    },[])

    const handleModalOvertimeReject = useCallback(async () => {
        try {
            const position = await getLocation()
            const clockOutData = {
                confirmation: false,
                lat: position.coords.latitude,
                long: position.coords.longitude,
                reason: ""
            }
            await postClockOut(clockOutData)

            bottomSheetOvertimeConfirmation.current?.dismiss()
        } catch (error) {
            console.log('Error ClockOut Reject Overtime', error);
        }
    },[])

    const handleModalOvertimeConfirmationYes = useCallback(() => {
        bottomSheetOvertimeConfirmation.current?.dismiss()
        bottonSheetOvertimeReason.current?.present()
    },[])

    const handleModalOvertimeReason = useCallback(() => {
        bottonSheetOvertimeReason.current?.present()
    },[])

    const handleModalOvertimeReasonSubmit = useCallback(async (reason) => {
        try {
            const position = await getLocation()
            const clockOutData = {
                confirmation: true,
                lat: position.coords.latitude,
                long: position.coords.longitude,
                reason: reason
            }
            await postClockOut(clockOutData)

            bottonSheetOvertimeReason.current?.dismiss()
            bottomSheetSuccess.current?.present()
        } catch (error) {
            console.log('Error Reason Clock Out', error);
        }
    },[])

    const handleModalOvertimeReasonClose = useCallback(() => {
        bottonSheetOvertimeReason.current?.dismiss()
    },[])

    const handleModalOvertimeSuccessClose = useCallback(() => {
        bottomSheetSuccess.current?.dismiss()
    },[])

    const handleModalErrorPresent = useCallback(() => {
        bottomSheetError.current?.present()
    },[])

    const handleModalErrorDismiss = useCallback(() => {
        bottomSheetError.current?.dismiss()
    })

    const renderBackdrop = useCallback( 
        props => (
            <BottomSheetBackdrop
            {...props}
            appearsOnIndex={1}
            disappearsOnIndex={0}
        />
        )
    ,[])

    const bottomSheet = {
        bottomSheetOvertimeConfirmation,
        bottonSheetOvertimeReason,
        bottomSheetSuccess,
        bottomSheetError,
        snapPoints,
        handleModalOvertimeConfirmation,
        handleModalOvertimeClose,
        handleModalOvertimeReject,
        handleModalOvertimeConfirmationYes,
        handleModalOvertimeReasonSubmit,
        handleModalOvertimeReasonClose,
        handleModalOvertimeSuccessClose,
        handleModalOvertimeReason,
        handleModalErrorPresent,
        handleModalErrorDismiss,
        renderBackdrop
    }

    useEffect(()=>{
        async function fetchData() {
            const userDefault = await getUserDefault()
            setUserData({...userData, ...userDefault})
            handleTodaysAttendance()
            handleAnalyticsView()
            handleMyLeaveRequestView()
            handleWhosTakingLeave()
            handleAttendanceLogs()
            if (userDefault.role.name === 'Staff') {
                handleMyOvertimeSubmissions()
            }
        }
        fetchData()
    },[])

    const handleClockIn = async () => {
        try {
            const position = await getLocation()
            await getClockIn()
            navigation.navigate(PATH.OTP, {position})
        } catch (error) {
            console.log('Error Clock In', error);
            setErrorMessage(error)
            handleModalErrorPresent()
        }
    }

    const handleTodaysAttendance = async () => {
        try {
            const data = await getTodaysAttendance()
            if (data) {
                console.log('todays attendance', data);
                setClockIn({...clockIn, ...data})

            }
        } catch (error) {
            console.log('Error Todays Attendance', error);
            setErrorMessage(error)
            handleModalErrorPresent()
        }
    }

    const handleAnalyticsView = async () => {
        try {
            const data = await getAnalytics()
            if (data) {
                setAnalytics({...analytics, ...data})
            }
        } catch (error) {
            console.log('Error get analytics', error)
            setErrorMessage(error)
            handleModalErrorPresent()
        }
    }

    const handleMyLeaveRequestView = async () => {
        try {
            const data = await getMyLeaveRequest(5)
            if (data) {
                const updatedData = data.map(item => {
                    const status = item.status.toLowerCase()
                    const leaveType = item.leaveType.toLowerCase()
                    if (item.status === 'PENDING') {
                        return {
                            ...item,
                            status: status.charAt(0).toUpperCase() + status.slice(1),
                            leaveType: leaveType.charAt(0).toUpperCase() + leaveType.slice(1),
                            color: '#A3A3A3'
                        }
                    } else if (item.status === "APPROVED") {
                        return {
                            ...item,
                            status: status.charAt(0).toUpperCase() + status.slice(1),
                            leaveType: leaveType.charAt(0).toUpperCase() + leaveType.slice(1),
                            color: '#4BB543'
                        }
                    } else if (item.status === "REJECTED") {
                        return {
                            ...item,
                            status: status.charAt(0).toUpperCase() + status.slice(1),
                            leaveType: leaveType.charAt(0).toUpperCase() + leaveType.slice(1),
                            color: '#E54646'
                        }
                    }
                    else {
                        return {
                            ...item,
                            status: status.charAt(0).toUpperCase() + status.slice(1),
                            leaveType: leaveType.charAt(0).toUpperCase() + leaveType.slice(1),
                            color: '#F0AD4E'
                        }
                    }
                })
                setLeaveRequest(updatedData)
            }
        } catch (error) {
            console.log('Error get my leave request', error)
            setErrorMessage(error)
            handleModalErrorPresent()
        }
    }

    const handleMyOvertimeSubmissions = async () => {
        try {
            const data = await getMyOvertimeSubmissions(5)
            if (data) {
                const updatedData = data.map(item => {
                    if (item.status === 'PENDING') {
                        return {
                            ...item,
                            color: '#A3A3A3'
                        }
                    } else if (item.status === "APPROVED") {
                        return {
                            ...item,
                            color: '#4BB543'
                        }
                    } else if (item.status === "REJECTED") {
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
                setOvertimeSubmissions(updatedData)
            }
        } catch (error) {
            console.log('Error get my overtime submissions', error);
            setErrorMessage(error)
            handleModalErrorPresent()
        }
    }

    const handleWhosTakingLeave = async () => {
        try {
            const data = await getWhosTakingLeave(5)
            if (data) {
                setTakingLeaves(data)
            }          
        } catch (error) {
            console.log('Error get whos taking leave', error)
            setErrorMessage(error)
            handleModalErrorPresent()
        }
    }

    const handleAttendanceLogs = async () => {
        try {
            const data = await getMyAttendancesLog(5)
            if (data) {
                setAttendanceLogs(data)
            }
        } catch (error) {
            console.log('Error get My Attendance Log', error)
            setErrorMessage(error)
            handleModalErrorPresent()
        }
    }

    const handleRequestClockOut = async () => {
        try {
            const data = await getClockOut()
            if (data.isOvertime ) {
                if (data.isOnHoliday) { 
                    handleModalOvertimeReason()
                } else if (data.isOnHoliday) {
                    handleModalOvertimeConfirmation()
                }
            } else {
                const position = await getLocation()
                const clockOutData = {
                    confirmation: false,
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    reason: ""
                }
                await postClockOut(clockOutData)
            }
        } catch (error) {
            console.log('Error get Clock Out',error)
            setErrorMessage(error)
            handleModalErrorPresent()
        }
    }

    const handleRequestLeave = () => {
        navigation.navigate(PATH.requestLeave)
    }

    const handleDetailLeave = (id) => {
        navigation.navigate(PATH.detailLeave, {id, userData})
    }

    const handleDetailOvertime = (id) => {
        navigation.navigate(PATH.detailOvertime, { id })
    }

    const handleLeaveViewAll = () => {
        navigation.navigate(PATH.myLeaveRequest)
    }

    const handleOvertimeViewAll = () => {
        navigation.navigate(PATH.myOvertimeSubmission)
    }

    const handleTakingLeaveViewAll = () => {
        navigation.navigate(PATH.whosTakingLeave)
    }

    const handleAttendanceViewAll = () => {
        navigation.navigate(PATH.myAttendanceLog)
    }

    const userAnalytics = [
        {
            id: 0,
            number: 0,
            title: "",
            desc: "days in month"
        },
        {
            id: 1,
            number: analytics ? analytics.yearlyCount : 0,
            title: "Leave Allowance",
            desc: "Days"
        },
        {
            id: 2,
            number: analytics ? analytics.lateClockIns : 0,
            title: "Late Clock in",
            desc: "days in month"
        },
        {
            id: 3,
            number: analytics ? analytics.earlyClockOuts : 0,
            title: "Early Clock out",
            desc: "days in month"
        },
        {
            id: 4,
            number: analytics ? analytics.unpaidCount : 0,
            title: "Unpaid leave request",
            desc: "times in month"
        }
    ]

    useEffect(() => {
        async function fetchData() {
            if (refreshing) {
                await handleAnalyticsView()
                await handleMyLeaveRequestView()
                await handleWhosTakingLeave()
                await handleAttendanceLogs()
                if (userData.role.name === 'Staff') {
                    await handleMyOvertimeSubmissions()
                }
            }
            setRefreshing(false)
        }
        fetchData()
    },[refreshing])

    return {
        userData,
        clockIn,
        formattedDate,
        userAnalytics,
        leaveRequest,
        bottomSheet,
        reasonOvertime,
        refreshing,
        overtimeSubmissions,
        takingLeaves,
        attendaceLogs,
        errorMessage,
        handleClockIn,
        handleRequestClockOut,
        setReasonOvertime,
        handleRequestLeave,
        handleDetailLeave,
        handleDetailOvertime,
        setRefreshing,
        handleLeaveViewAll,
        handleOvertimeViewAll,
        handleTakingLeaveViewAll,
        handleAttendanceViewAll
    }
}

export default HomeModel