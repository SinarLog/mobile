import { useState } from "react"

const EmployeeHistoryModel = () => {
    const [tab, setTab] = useState('Leave')

    const tabView = {
        tab, 
        setTab
    }

    return {
        tabView
    }
}

export default EmployeeHistoryModel