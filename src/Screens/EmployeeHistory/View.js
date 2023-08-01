import { View, Text, Pressable, Image } from "react-native"
import EmployeeHistoryModel from "./Model"
import ChevronBackIcon from "../../assets/chevronCloseIcon/chevronCloseIcon.png"
import LeaveView from "./components/LeaveView"
import OvertimeView from "./components/OvertimeView"
import AttendanceView from "./components/AttendanceView"

const EmployeeHistoryView = ({ navigation, route }) => {
    const { id } = route.params
    const { tabView } = EmployeeHistoryModel()

    return (
        <View className="flex-1 bg-backgroundHome">
            <View className="flex-row px-6 pt-6 items-center justify-center">
                <Pressable className="absolute left-6 top-6" onPress={() => navigation.goBack()}>
                    <Image source={ChevronBackIcon}/>
                </Pressable>
                <Text className="text-base text-OTPHitam font-bold">History</Text>
            </View>
            <View className="flex-row justify-around mx-6 mt-8">
                <Pressable className={`flex-1 ${tabView.tab === 'Leave' ? 'border-b-PrimaryNormal border-b-2' : ''} items-center pb-2`} onPress={() => tabView.setTab('Leave')}>
                    <Text className={`text-xs ${tabView.tab ==='Leave' ? 'text-PrimaryNormal' : 'text-textHitam'} font-normal`}>Leave</Text>
                </Pressable>
                <Pressable className={`flex-1 ${tabView.tab === 'Overtime' ? 'border-b-PrimaryNormal border-b-2' : ''} items-center pb-2`} onPress={() => tabView.setTab('Overtime')}>
                    <Text className={`text-xs ${tabView.tab ==='Overtime' ? 'text-PrimaryNormal' : 'text-textHitam'} font-normal`}>Overtime</Text>
                </Pressable>
                <Pressable className={`flex-1 ${tabView.tab === 'Attendance' ? 'border-b-PrimaryNormal border-b-2' : ''} items-center pb-2`} onPress={() => tabView.setTab('Attendance')}>
                    <Text className={`text-xs ${tabView.tab ==='Attendance' ? 'text-PrimaryNormal' : 'text-textHitam'} font-normal`}>Attendance</Text>
                </Pressable>
            </View>
            {
                tabView.tab === 'Leave' ?
                <LeaveView id={id}/>
                : 
                tabView.tab === 'Overtime' ?
                <OvertimeView id={id}/>
                :
                <AttendanceView id={id}/>
            }

        </View>
    )
}

export default EmployeeHistoryView