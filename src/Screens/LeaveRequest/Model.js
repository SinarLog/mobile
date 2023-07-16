import { useMemo, useState, useEffect } from "react"
import { postApplyLeave, postRequestLeave } from "../../Network/LeaveFlow/RemoteStorage"
import DocumentPicker from 'react-native-document-picker'
import PATH from "../../Navigator/PathNavigation"

const LeaveRequestModel = ({ navigation }) => {

    const [openLeaveType, setOpenLeaveType] = useState(false)
    const [value, setValue] = useState()
    const [items, setItems] = useState([
        {label: 'Annual', value: 'ANNUAL'},
        {label: 'Unpaid', value: 'UNPAID'},
        {label: 'Marriage', value: 'MARRIAGE'},
        {label: 'Sick', value: 'SICK'},
    ])

    const date = new Date()
    const initDate = date.toISOString().split('T')[0]
    
    const [range, setRange] = useState({})
    
    const marked = useMemo(() => {
        if(!range.startDate) return {};

        let start = new Date(range.startDate).getTime();
        let end = new Date(range.endDate || range.startDate).getTime();
        let marked = {};
        
        for(let cur = start; cur <= end; cur += 60 * 60 * 24000) {
            let curStr = new Date(cur).toISOString().substr(0, 10);
            marked[curStr] = {
                selected: true,
                color: (cur == start || cur ==end) ? '#E54646': '#FBE3E3',
                textColor: (cur == start || cur ==end) ? 'white': '#E54646',
                startingDay: cur == start,
                endingDay: cur == end,
            };
        }
        return marked
        
    },[range])
    
    const handleDayPress = (day) => {
        if(range.startDate && !range.endDate) {
            let newRange = {...range, ...{endDate: day.dateString}};
            setRange(newRange);
        }
        else {
            setRange({
                startDate: day.dateString
            });
        }
    }
    
    const [calendarVisible, setCalendarVisible] = useState(false)

    const [reason, setReason] = useState('')

    const handleInputReason = (text) => {
        setReason(text)
    }
    
    const [file, setFile] = useState([])

    const handleFilePicker = async () => {
        try {
            const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory'
            })
            if (pickerResult.size <= 2000000) {
                setFile([pickerResult])
            }
        } catch (error) {
            console.log('Error File Picker', error);
        }
    }

    const [error, setError] = useState({
        leaveType: false,
        leaveDate: false,
        reason: false
    })

    const [isLeakage, setIsLeakage] = useState({})
    const [enableSend, setEnableSend] = useState(false)
    const [excessLeave, setExcessLeave] = useState(0)

    const handleCheckButton = async () => {
        // VALIDATION FOR BORDER
        if (!value) {
            setError(prevError => ({ ...prevError, leaveType: true }));
        }
        if (!range.startDate) {
            setError(prevError => ({ ...prevError, leaveDate: true }));
        }
        if (!reason) {
            setError(prevError => ({ ...prevError, reason: true }));
        }
        if (!value || !range.startDate || !reason) { return }
        // HANDLE POST REQUEST LEAVE
        const leaveData = {
            reason: reason,
            from: range.startDate,
            to: range.endDate ? range.endDate : range.startDate,
            type: value
        }
        try {
            const result = await postRequestLeave(leaveData)
            console.log('SUCCESS post request leave',result);
            setIsLeakage({...isLeakage, ...result})
            if (!result.isLeaveLeakage) {
                setEnableSend(true)
                setExcessLeave(result.excessLeaveDuration)
            }
        } catch (error) {
            console.log('Error Post Request Leave', error.response.data.error.errors);
        }
    }

    const [closeReminder, setClassReminder] = useState(true)
    const [checkbox, setCheckbox] = useState({
        annual: false,
        unpaid: false
    })
    const [inputLeakage, setInputLeakage] = useState({
        annual: "",
        unpaid: ""
    })
    
    const handleCloseReminder = () => {
        setClassReminder(false)
    }

    const handleCheckbox = (key,isChecked) => {
        setCheckbox({
            ...checkbox, 
            [key]: isChecked
        })
    }

    const handleInputLeakage = (key, input) => {
        setInputLeakage({
            ...inputLeakage,
            [key]: input
        })
    }

    useEffect(() => {
        console.log(inputLeakage);
        if (inputLeakage.annual && inputLeakage.unpaid) {
            if (+inputLeakage.annual + +inputLeakage.unpaid === excessLeave) {
                setEnableSend(true)
            } else {
                setEnableSend(false)
            }
        } else if (inputLeakage.annual) {
            if (+inputLeakage.annual === excessLeave) {
                setEnableSend(true)
            } else {
                setEnableSend(false)
            }
        } else if (inputLeakage.unpaid) {
            if (+inputLeakage.unpaid === excessLeave) {
                setEnableSend(true)
            } else {
                setEnableSend(false)
            }
        } else {
            setEnableSend(false)
        }
    },[inputLeakage])

    const handleSendButton = async () => {
        let bodyFormData = new FormData();

        const parent = {
            reason: reason,
            from: range.startDate,
            to: range.endDate ? range.endDate : range.startDate,
            type: value
        }

        let overflows = []

        if (isLeakage.isLeaveLeakage) {
            if (inputLeakage.annual) {
                overflows = [...overflows, { type: "ANNUAL", count: +inputLeakage.annual}]
            }
            if (inputLeakage.unpaid) {
                overflows = [...overflows, { type: "UNPAID", count: +inputLeakage.unpaid}]
            }
        }

        const leave = {
            parent,
            overflows
        }
        bodyFormData.append('leave',JSON.stringify(leave))

        if (file.length > 0) {
            bodyFormData.append('attachment', file[0])
        }

        try {
            const result = await postApplyLeave(bodyFormData)
            console.log('Success Post Leave', result);
            navigation.replace(PATH.tabMain)
        } catch (error) {
            console.log(bodyFormData);
            console.log('Error Apply Leave', error);
        }
    }

    const dropdown = {
        openLeaveType,
        value,
        items,
        setValue,
        setOpenLeaveType
    }
    
    const datePicker = {
        range,
        marked,
        calendarVisible,
        initDate,
        handleDayPress,
        setCalendarVisible
    }

    const reasonInput = {
        reason,
        handleInputReason
    }
    
    const filePicker = {
        file,
        handleFilePicker
    }

    const validation = {
        error,
        isLeakage,
        enableSend,
        handleCheckButton,
        handleSendButton
    }

    const leakage = {
        closeReminder,
        checkbox,
        inputLeakage,
        handleCloseReminder,
        handleCheckbox,
        handleInputLeakage
    }
        
    return {
        dropdown,
        datePicker,
        reasonInput,
        filePicker,
        validation,
        leakage
    }
}

export default LeaveRequestModel