import { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { getMyAttendancesLog } from "../../Network/AttendanceFlow/RemoteStorage"

const MyAttendanceLogModel = ({ navigation }) => {
    const status = [
        {id: 0, title: "Early Clock Out"},
        {id: 1, title: "Late Clock In"},
        {id: 2, title: "Closed"},
    ]

    const [selectedStatus, setSelectedStatus] = useState([])
    const handleAddStatus = (stat) => {
        const updatedArray = [...selectedStatus, stat]
        setSelectedStatus(updatedArray)
    }
    
    const handleRemoveStatus = (stat) => {
        const updatedArray = selectedStatus.filter(item => item !== stat)
        setSelectedStatus(updatedArray)
    }

    const [openMonth, setOpenMonth] = useState(false)
    const [valueMonth, setValueMonth] = useState()
    const [itemsMonth] = useState([
        { label: 'January', value: 1 },
        { label: 'February', value: 2 },
        { label: 'March', value: 3 },
        { label: 'April', value: 4 },
        { label: 'May', value: 5 },
        { label: 'June', value: 6 },
        { label: 'July', value: 7 },
        { label: 'August', value: 8 },
        { label: 'September', value: 9 },
        { label: 'October', value: 10 },
        { label: 'November', value: 11 },
        { label: 'December', value: 12 },
    ])
    const onMonthOpen = useCallback(() => {
        setOpenYear(false)
    },[])

    const dropdownMonth = {
        openMonth,
        valueMonth,
        itemsMonth,
        setOpenMonth,
        setValueMonth,
        onMonthOpen
    }

    const [openYear, setOpenYear] = useState(false)
    const [valueYear, setValueYear] = useState()
    const [itemsYear] = useState([
        { label: '2019', value: 2019 },
        { label: '2020', value: 2020 },
        { label: '2021', value: 2021 },
        { label: '2022', value: 2022 },
        { label: '2023', value: 2023 },
        { label: '2024', value: 2024 },
        { label: '2025', value: 2025 },
    ])
    const onYearOpen = useCallback(() => {
        setOpenMonth(false)
    },[])
    const dropdownYear = {
        openYear,
        valueYear,
        itemsYear,
        setOpenYear,
        setValueYear,
        onYearOpen
    }
    
    const bottomSheetFilter = useRef(null)
    const snapPoints = useMemo(() => ['25%','40%','70%','100%'],[])
    const handleBottomSheetFilterPresent = useCallback(() => {
        bottomSheetFilter.current?.present()
    },[])
    const handleBottomSheetFilterDismiss = useCallback(() => {
        bottomSheetFilter.current?.dismiss()
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
        status,
        bottomSheetFilter,
        snapPoints,
        selectedStatus,
        dropdownMonth,
        dropdownYear,
        handleAddStatus,
        handleRemoveStatus,
        handleBottomSheetFilterPresent,
        handleBottomSheetFilterDismiss,
        renderBackdrop
    }

    const [attendanceLogs, setAttendanceLogs] = useState([])

    const handleAttendanceLogs = async () => {
        try {
            const data = await getMyAttendancesLog(99999999)
            if (data) {
                setAttendanceLogs(data)
            }
        } catch (error) {
            console.log('Error get My Attendance Log', error)
        }
    }

    const handleFilterButton = async () => {
        try {
            const data = await getMyAttendancesLog(99999999, selectedStatus, valueMonth, valueYear)
            if (data) {
                setAttendanceLogs(data)
            } else {
                setAttendanceLogs([])
            }
            bottomSheetFilter.current?.dismiss()
        } catch (error) {
            console.log('Error get My Attendance Log filter', error)
        }
    }

    const handleBackButton = () => {
        navigation.goBack()
    }

    useEffect(() => {
        handleAttendanceLogs()
    },[])

    return {
        attendanceLogs,
        bottomSheet,
        handleBackButton,
        handleFilterButton
    }
}

export default MyAttendanceLogModel