import AttendanceIcon from "../../../assets/attendanceIcon/attendanceIcon.png"
import LeaveIcon from "../../../assets/leaveIcon/leaveIcon.png"
import OvertimeIcon from "../../../assets/overtimeIcon/overtimeIcon.png"
import EmployeesIcon from "../../../assets/employeeIcon/employeeIcon.png"
import { Image, Text, View } from "react-native"

const IncomingView = () => {
    return (
        <View className="flex-row mx-6 justify-between mt-6">
            <View className="items-center justify-center">
                <View className="bg-backgroundHomeItem p-3 rounded-full">
                    <Image source={AttendanceIcon} style={{width: 16, height:16}}/>
                </View>
                <Text className="text-textHitam font-medium text-xs">Attendance</Text>
            </View>
            <View className="items-center justify-center">
                <View className="bg-backgroundHomeItem p-3 rounded-full">
                    <Image source={LeaveIcon} style={{width: 16, height:16}}/>
                </View>
                <Text className="text-textHitam font-medium text-xs">Leave</Text>
            </View>
            <View className="items-center justify-center">
                <View className="bg-backgroundHomeItem p-3 rounded-full">
                    <Image source={OvertimeIcon} style={{width: 16, height:16}}/>
                </View>
                <Text className="text-textHitam font-medium text-xs">Overtime</Text>
            </View>
            <View className="items-center justify-center">
                <View className="bg-backgroundHomeItem p-3 rounded-full">
                    <Image source={EmployeesIcon} style={{width: 16, height:16}}/>
                </View>
                <Text className="text-textHitam font-medium text-xs">Employees</Text>
            </View>
        </View>
    )
}

export default IncomingView