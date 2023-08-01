import { FlatList, Image, Pressable, Text, View } from "react-native"
import NoDataIcon from "../../../assets/noDataIcon/noDataIcon.png"
import { hexToRgbA } from "../../../utils/helper"
import PATH from "../../../Navigator/PathNavigation"

const AttendanceView = ({ attendanceLog, handleViewAll, navigation }) => {
    return (
        <View>
            <View className="flex-row items-center justify-between mx-6 mt-8">
                <Text className="text-textHitam text-base">My Attendance Log</Text>
                {
                    attendanceLog.length > 0 ?
                    
                    <Pressable className="flex-row items-center" onPress={handleViewAll}>
                        <Text className="text-PrimaryNormal text-xs ml-4">View all</Text>
                    </Pressable>

                    : null
                }
            </View>
            <View className="mx-6 mt-4">
                <FlatList 
                    data={attendanceLog}
                    keyExtractor={item => item.date}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Pressable className="bg-white mb-2 rounded" onPress={() => navigation.navigate(PATH.attendanceDetail, { item })}> 
                        <View className="flex-row justify-between py-2 px-2">
                            <Text className="text-black text-xs">{item.date}</Text>
                            <View className="flex-row">
                                <Text className="text-black text-xs mr-2">{item.clockInAt}</Text>
                                <Text className="text-black text-xs">{item.clockOutAt}</Text>
                            </View>
                        </View>
                        <View className="flex-row py-2 px-2 justify-end">
                            {
                                !item.lateClockIn && !item.earlyClockOut ?
                                <View className="py-1 px-2 rounded-full" style={{backgroundColor: hexToRgbA('#4BB543', 0.25)}}>
                                    <Text className='capitalize text-xs' style={{color: '#4BB543'}}>On Time</Text>
                                </View>
                                : 
                                !item.lateClockIn && item.earlyClockOut ?
                                <View className="py-1 px-2 rounded-full" style={{backgroundColor: hexToRgbA('#E54646', 0.25)}}>
                                    <Text className='capitalize text-xs' style={{color: '#E54646'}}>Early Clock Out</Text>
                                </View>
                                :
                                item.lateClockIn && item.earlyClockOut ?
                                <>
                                <View className="py-1 px-2 rounded-full ml-2" style={{backgroundColor: hexToRgbA('#E54646', 0.25)}}>
                                    <Text className='capitalize text-xs' style={{color: '#E54646'}}>Late Clock In</Text>
                                </View>
                                <View className="py-1 px-2 rounded-full ml-2" style={{backgroundColor: hexToRgbA('#E54646', 0.25)}}>
                                    <Text className='capitalize text-xs' style={{color: '#E54646'}}>Early Clock Out</Text>
                                </View>
                                </>
                                : 
                                item.lateClockIn ?
                                <View className="py-1 px-2 rounded-full ml-2" style={{backgroundColor: hexToRgbA('#E54646', 0.25)}}>
                                    <Text className='capitalize text-xs' style={{color: '#E54646'}}>Late Clock In</Text>
                                </View>
                                : 
                                <View className="py-1 px-2 rounded-full ml-2" style={{backgroundColor: hexToRgbA('#F0AD4E', 0.25)}}>
                                    <Text className='capitalize text-xs' style={{color: '#F0AD4E'}}>Closed</Text>
                                </View>
                            }
                        </View>
                    </Pressable>
                    )}
                    ListEmptyComponent={ () => (
                        <View className="bg-white py-4 items-center justify-center rounded">
                            <Image source={NoDataIcon}/>
                            <Text className="text-textHitam text-xs font-semibold">Opps, you dont have any attendances</Text>
                        </View>
                    )}
                    />
            </View>
        </View>
    )
}

export default AttendanceView