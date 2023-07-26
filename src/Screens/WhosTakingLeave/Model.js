import { useState, useEffect } from "react"
import { getWhosTakingLeave } from "../../Network/EmployeeFlow/RemoteStorage"

const WhosTakingLeaveModel = ({ navigation }) => {
    const [takingLeaves, setTakingLeaves] = useState([])

    useEffect(() => {
        loadData()
    },[])

    const loadData = async () => {
        try {
            const data = await getWhosTakingLeave(999999)
            if (data) {
                setTakingLeaves(data)
            }          
        } catch (error) {
            console.log('Error get whos taking leave', error)
        }
    }

    const [inputFocused, setInputFocused] = useState(false)
    const [searchView, setSearchView] = useState(false)
    const [value, setValue] = useState('')

    const search = {
        searchView,
        inputFocused,
        value,
        setSearchView,
        setInputFocused,
        setValue
    }

    return {
        takingLeaves,
        search
    }
}

export default WhosTakingLeaveModel