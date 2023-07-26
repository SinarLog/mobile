import { useEffect, useState } from "react"
import { getChangeLogs } from "../../Network/ProfileFlow/RemoteStorage"

const ActivityLogModel = ({ navigation, route }) => {
    const [changeLogs, setChangeLogs] = useState([])

    useEffect(() => {
        loadData()
    },[])

    const loadData = async () => {
        try {
            const data = await getChangeLogs()
            if (data) {
                setChangeLogs(data)
            }
        } catch (error) {
            console.log('Error get Change Log', error);
        }
    }

    return {
        changeLogs
    }
}

export default ActivityLogModel