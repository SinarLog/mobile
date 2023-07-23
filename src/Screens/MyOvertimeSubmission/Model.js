import { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import { useCallback, useMemo, useRef, useState, useEffect } from "react"
import { getMyOvertimeSubmissions } from "../../Network/AttendanceFlow/RemoteStorage"
import PATH from "../../Navigator/PathNavigation"

const MyOvertimeSubmissionModel = ({ navigation }) => {
    const [overtimeSubmissions, setOvertimeSubmissions] = useState([]) 

    const handleBackButton = () => {
        navigation.goBack()
    }

    const handleDetailOvertime = (id) => {
        navigation.navigate(PATH.detailOvertime, { id })
    }

    const handleMyOvertimeSubmissions = async () => {
        try {
            const data = await getMyOvertimeSubmissions(9999999)
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
        }
    }

    useEffect(() => {
        handleMyOvertimeSubmissions()
    },[])

    const [selectedStatus, setSelectedStatus] = useState('')

    const handleClickStatus = (stat) => {
        setSelectedStatus(stat)
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
        bottomSheetFilter,
        snapPoints,
        selectedStatus,
        dropdownMonth,
        dropdownYear,
        handleClickStatus,
        handleBottomSheetFilterPresent,
        handleBottomSheetFilterDismiss,
        renderBackdrop
    }

    const handleFilterButton = async () => {
        try {
            const data = await getMyOvertimeSubmissions(9999999,selectedStatus,valueMonth,valueYear)
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
                bottomSheetFilter.current?.dismiss()
            } else {
                setOvertimeSubmissions([])
                bottomSheetFilter.current?.dismiss()
            }
        } catch (error) {
            console.log('Error get my overtime submissions', error);
        }
    }

    return {
        overtimeSubmissions,
        bottomSheet,
        handleBackButton,
        handleFilterButton,
        handleDetailOvertime
    }
}

export default MyOvertimeSubmissionModel