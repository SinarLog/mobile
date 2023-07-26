import { View, Text, Pressable } from "react-native"
import LeaveView from "./LeaveView"
import OvertimeView from "./OvertimeView"
import AttendanceView from "./AttendanceView"

const HistoryView = ({ incoming, navigation }) => {
    return (
        <View>
            <View className="flex-row justify-around mx-6 mt-8">
                <Pressable className={`flex-1 ${incoming.incomingTabView === 'Leave' ? 'border-b-PrimaryNormal border-b-2' : ''} items-center pb-2`} onPress={() => incoming.setIncomingTabView('Leave')}>
                    <Text className={`text-xs ${incoming.incomingTabView ==='Leave' ? 'text-PrimaryNormal' : 'text-textHitam'} font-normal`}>Leave</Text>
                </Pressable>
                <Pressable className={`flex-1 ${incoming.incomingTabView === 'Overtime' ? 'border-b-PrimaryNormal border-b-2' : ''} items-center pb-2`} onPress={() => incoming.setIncomingTabView('Overtime')}>
                    <Text className={`text-xs ${incoming.incomingTabView ==='Overtime' ? 'text-PrimaryNormal' : 'text-textHitam'} font-normal`}>Overtime</Text>
                </Pressable>
                <Pressable className={`flex-1 ${incoming.incomingTabView === 'Attendance' ? 'border-b-PrimaryNormal border-b-2' : ''} items-center pb-2`} onPress={() => incoming.setIncomingTabView('Attendance')}>
                    <Text className={`text-xs ${incoming.incomingTabView ==='Attendance' ? 'text-PrimaryNormal' : 'text-textHitam'} font-normal`}>Attendance</Text>
                </Pressable>
            </View>
            {
                incoming.incomingTabView === 'Leave' ?
                <LeaveView isFromHistory={true} navigation={navigation}/>
                : 
                incoming.incomingTabView === 'Overtime' ?
                <OvertimeView isFromHistory={true} navigation={navigation}/>
                :
                <AttendanceView />
            }

        </View>
    )
}

export default HistoryView