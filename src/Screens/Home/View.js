import { Text, View, ScrollView, ImageBackground, Image, Pressable, FlatList } from "react-native"
import homeBackgroundIcon from "../../assets/homeBackgroundIcon/homeBackgroundIcon.png"
import SunIcon from "../../assets/sunIcon/sunIcon.png"
import ArrowLeftIcon from "../../assets/arrowLeftIcon/arrowLeftIcon.png"
import ArrowRightIcon from "../../assets/arrowRightIcon/arrowRightIcon.png"
import AttendanceIcon from "../../assets/attendanceIcon/attendanceIcon.png"
import LeaveIcon from "../../assets/leaveIcon/leaveIcon.png"
import OvertimeIcon from "../../assets/overtimeIcon/overtimeIcon.png"
import EmployeesIcon from "../../assets/employeeIcon/employeeIcon.png"
import SliderIcon from "../../assets/sliderIcon/sliderIcon.png"
import HomeModel from "./Model"

const HomeView = ({ navigation }) => {
    const { userData, formattedDate, userDetail, leaveRequest, handleClockIn } = HomeModel({ navigation })

    return (
        <View className="bg-backgroundHome">
            <ScrollView>
                <ImageBackground source={homeBackgroundIcon} style={{height:180, width:'100%'}}>
                    <View className="flex-row mt-16 mx-6 justify-between items-center">
                        <View>
                            <Text className="font-normal text-xl text-white">{userData.fullName ? userData.fullName: ''}</Text>
                            <Text className="font-normal text-xs text-white">{userData.job ? userData.job.name: ''}</Text>
                        </View>
                        <View className="w-8 h-8 bg-white rounded-2xl"></View>
                    </View>

                </ImageBackground>
                <View className="bg-white mx-6 rounded-lg p-4 -mt-10 drop-shadow-lg">
                    <View className="flex-row justify-between">
                        <Text className="font-normal text-xs text-textHitam">Attendance</Text>
                        <Text className="font-normal text-xs text-textHitam">{formattedDate}</Text>
                        <Text className="font-normal text-xs text-textHitam">08:15:23</Text>
                    </View>
                    <View className="flex-row mt-4 items-center">
                        <Image source={SunIcon} style={{width:16, height:16}}/>
                        <Text className="ml-5 font-normal text-xs text-textHitam text-start">Good Morning {userData.fullName ? userData.fullName: ''}. You have not clock in yet. Have a good day</Text>
                    </View>
                    <View className="flex-row mt-4 items-center justify-between">
                        <Pressable 
                            className="flex-1 flex-row bg-SuccessNormal py-3 items-center justify-center rounded-lg"
                            onPress={handleClockIn}
                        >
                            <Image source={ArrowLeftIcon}/>
                            <Text className="font-normal text-xs text-SuccessLight ml-3">Clock In</Text>
                        </Pressable>
                        <Pressable className="flex-1 flex-row ml-4 bg-PrimaryNormal py-3 items-center justify-center rounded-lg">
                            <Image source={ArrowRightIcon}/>
                            <Text className="font-normal text-xs text-SuccessLight ml-3">Clock Out</Text>
                        </Pressable>
                    </View>
                </View>
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
                <View className="ml-6 mt-8">
                    <FlatList 
                        data={userDetail}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => (
                            item.id === 0 ?
                            <Pressable className="flex-row items-center justify-center bg-PrimaryNormal py-2 px-4 rounded-lg">
                                <Image source={LeaveIcon} style={{width:16,height:16, tintColor: "white"}} />
                                <View className="ml-4">
                                    <Text className="text-white font-bold text-xs">Request</Text>
                                    <Text className="text-white text-xs">Leave</Text>
                                </View>
                            </Pressable>
                            :
                            <View className="flex-row items-center justify-center py-2 px-4 rounded-lg border-2 border-PrimaryNormal ml-4"> 
                                <Text className="text-PrimaryNormal font-bold text-base">{item.number}</Text>
                                <View className="ml-4">
                                    <Text className="text-PrimaryNormal font-bold text-xs">{item.title}</Text>
                                    <Text className="text-PrimaryNormal text-xs">{item.desc}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
                <View className="flex-row items-center justify-between mx-6 mt-8">
                    <Text className="text-textHitam text-base">My Leave Request</Text>
                    <View className="flex-row items-center">
                        <Image source={SliderIcon} />
                        <Text className="text-PrimaryNormal text-xs ml-4">View all</Text>
                    </View>
                </View>
                <View className="mx-6 mt-4">
                    <FlatList 
                        data={leaveRequest}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View className="flex-row justify-between bg-white mb-2 rounded"> 
                                <View className="flex-row">
                                    <View className="bg-InactiveNormal w-2">
                                    </View>
                                    <View className="py-2 px-2">
                                        <Text className="text-black text-xs">{item.leaveType}</Text>
                                        <View className="flex-row mt-2">
                                            <Text className="text-black text-xs">{item.startDate}</Text>
                                            <Text className="text-black text-xs ml-4">{item.endDate}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View className="py-2 pr-2">
                                    <Text className="text-black text-xs">{item.duration}</Text>
                                    <Text className="text-InactiveDarker text-xs mt-2">{item.status}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default HomeView