import { Pressable, Text, View } from "react-native"
import LeaveView from "./LeaveView"
import { useState } from "react"
import OvertimeView from "./OvertimeView"

const TabLeaveView = ({leaveRequest, handleDetailLeave, overtimeSubmissions, handleDetailOvertime}) => {
    const [tab, setTab] = useState('Leave')

    return (
        <View>
            <View className="bg-white flex-row mt-8 mx-6 rounded-2xl justify-around">
                <Pressable 
                    className={`flex-1 ${tab === 'Leave' ? 'bg-PrimaryNormal' : 'bg-white'} py-2 rounded-2xl items-center mr-2`}
                    onPress={() => setTab('Leave')}
                >
                    <Text className={`text-base ${tab === 'Leave' ? 'text-white' : 'text-PrimaryNormal'} font-normal`}>Leave</Text>
                </Pressable>
                <Pressable 
                    className={`flex-1 ${tab === 'Overtime' ? 'bg-PrimaryNormal' : 'bg-white'} py-2 rounded-2xl items-center`}
                    onPress={() => setTab('Overtime')}
                >
                    <Text className={`text-base ${tab === 'Overtime' ? 'text-white' : 'text-PrimaryNormal'} font-normal`}>Overtime</Text>
                </Pressable>
            </View>
            {
                tab === 'Leave' ?

                <LeaveView leaveRequest={leaveRequest} handleDetailLeave={handleDetailLeave}/>
                : 
                <OvertimeView overtimeSubmissions={overtimeSubmissions} handleDetailOvertime={handleDetailOvertime} />
            }

        </View>
    )
}

export default TabLeaveView