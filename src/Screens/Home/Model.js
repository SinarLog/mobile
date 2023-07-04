import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { getUserDefault } from "../../LocalStorage/UserDefault"
import { format } from "date-fns"
import PATH from "../../Navigator/PathNavigation"
import { getLocation } from "../../Geolocation/Location"
import { getClockIn, getClockOut, postClockOut } from "../../Network/AttendanceFlow/RemoteStorage"
import { getClockInLocalData, getclockoutLocalData } from "../../LocalStorage/AttendanceData"
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet"

const HomeModel = ({ navigation }) => {
    const [userData, setUserData] = useState({})
    const [clockIn, setClockIn] = useState(null)
    const [clockOut, setClockOut] = useState(null)
    const [reasonOvertime, setReasonOvertime] = useState("")

    const currentDate = new Date()
    const formattedDate = format(currentDate,'EEE d MMM')

    const bottomSheetOvertimeConfirmation = useRef(null)
    const bottonSheetOvertimeReason = useRef(null)
    const bottomSheetSuccess = useRef(null)

    const snapPoints = useMemo(() => ['20%','40%','70%'],[])

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
        snapPoints,
        handleModalOvertimeConfirmation,
        handleModalOvertimeClose,
        handleModalOvertimeReject,
        handleModalOvertimeConfirmationYes,
        handleModalOvertimeReasonSubmit,
        handleModalOvertimeReasonClose,
        handleModalOvertimeSuccessClose,
        handleModalOvertimeReason,
        renderBackdrop
    }

    useEffect(()=>{
        async function fetchData() {
            const userDefault = await getUserDefault()
            setUserData({...userData, ...userDefault})
        }
        fetchData()
        handleClockInView()
        handleClockOutView()
    },[])

    const handleClockIn = async () => {
        try {
            const position = await getLocation()
            await getClockIn()
            navigation.navigate(PATH.OTP, {position})
        } catch (error) {
            console.log('Error Clock In', error);
        }
    }

    const handleClockInView = async () => {
        try {
            const data = await getClockInLocalData()
            if (data) {
                setClockIn({...clockIn, ...data})
            }
        } catch (error) {
            console.log('Error get local data clockin', error);
        }
    }

    const handleClockOutView = async () => {
        try {
            const data = await getclockoutLocalData()
            if (data) {
                setClockOut({...clockOut, ...data})
            }
        } catch (error) {
            console.log('Error get local Clock out', error);
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
            console.log('Error get Clock Out',error);
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
        clockIn,
        clockOut,
        formattedDate,
        userDetail,
        leaveRequest,
        bottomSheet,
        reasonOvertime,
        handleClockIn,
        handleRequestClockOut,
        setReasonOvertime
    }
}

export default HomeModel