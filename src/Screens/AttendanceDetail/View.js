import { Image, Linking, Pressable, Text, View } from "react-native"
import ChevronBackIcon from "../../assets/chevronCloseIcon/chevronCloseIcon.png"
import { handleGoogleMaps, hexToRgbA } from "../../utils/helper"

const AttendanceDetailView = ({ navigation, route }) => {
    const { item } = route.params
    return (
        <View className="flex-1 bg-backgroundHome">
            <View className="flex-row px-6 pt-6 items-center justify-center">
                <Pressable className="absolute left-6 top-6" onPress={() => navigation.goBack()}>
                    <Image source={ChevronBackIcon}/>
                </Pressable>
                <Text className="text-base text-OTPHitam font-bold">My Attendance Detail</Text>
            </View>
            <View className="bg-white p-4 mx-6 mt-4 rounded-lg">
                <Text className="text-textHitam text-xs font-semibold">Clock in detail</Text>
                <View className="flex-row items-center justify-between mt-4 mb-2">
                    <Text className="text-textHitam text-xs font-semibold">Date</Text>
                    <Text className="text-textHitam text-xs font-normal">{item.date}</Text>
                </View>
                <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                <View className="flex-row items-center justify-between my-2">
                    <Text className="text-textHitam text-xs font-semibold">Clock in</Text>
                    <Text className="text-textHitam text-xs font-normal">{item.clockInAt} WIB</Text>
                </View>
                <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                <View className="flex-row items-center justify-between my-2">
                    <Text className="text-textHitam text-xs font-semibold">Status</Text>
                    {
                        !item.lateClockIn && !item.earlyClockOut ?
                        <View className="py-1 px-2 rounded-full" style={{backgroundColor: hexToRgbA('#4BB543', 0.25)}}>
                            <Text className='capitalize' style={{color: '#4BB543'}}>On Time</Text>
                        </View>
                        : 
                        !item.lateClockIn && item.earlyClockOut ?
                        <View className="py-1 px-2 rounded-full" style={{backgroundColor: hexToRgbA('#E54646', 0.25)}}>
                            <Text className='capitalize' style={{color: '#E54646'}}>Early Clock Out</Text>
                        </View>
                        :
                        item.lateClockIn && item.earlyClockOut ?
                        <>
                        <View className="py-1 px-2 rounded-full ml-2" style={{backgroundColor: hexToRgbA('#E54646', 0.25)}}>
                            <Text className='capitalize' style={{color: '#E54646'}}>Late Clock In</Text>
                        </View>
                        <View className="py-1 px-2 rounded-full ml-2" style={{backgroundColor: hexToRgbA('#E54646', 0.25)}}>
                            <Text className='capitalize' style={{color: '#E54646'}}>Early Clock Out</Text>
                        </View>
                        </>
                        : 
                        item.lateClockIn ?
                        <View className="py-1 px-2 rounded-full ml-2" style={{backgroundColor: hexToRgbA('#E54646', 0.25)}}>
                            <Text className='capitalize' style={{color: '#E54646'}}>Late Clock In</Text>
                        </View>
                        : 
                        <View className="py-1 px-2 rounded-full ml-2" style={{backgroundColor: hexToRgbA('#F0AD4E', 0.25)}}>
                            <Text className='capitalize' style={{color: '#F0AD4E'}}>Closed</Text>
                        </View>
                    }
                </View>
                <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                <View className="flex-row items-center justify-between my-2">
                    <Text className="text-textHitam text-xs font-semibold">Location</Text>
                    <Pressable onPress={() => Linking.openURL(handleGoogleMaps(item.clockInLoc.lat, item.clockInLoc.long))}>
                        <Text className="text-xs font-normal text-SecondaryNormal italic">open google map</Text>
                    </Pressable>
                </View>
            </View>
            <View className="bg-white p-4 mx-6 mt-4 rounded-lg">
                <Text className="text-textHitam text-xs font-semibold">Clock out detail</Text>
                <View className="flex-row items-center justify-between mt-4 mb-2">
                    <Text className="text-textHitam text-xs font-semibold">Date</Text>
                    <Text className="text-textHitam text-xs font-normal">{item.date}</Text>
                </View>
                <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                <View className="flex-row items-center justify-between my-2">
                    <Text className="text-textHitam text-xs font-semibold">Clock out</Text>
                    <Text className="text-textHitam text-xs font-normal">{item.clockOutAt} WIB</Text>
                </View>
                <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                <View className="flex-row items-center justify-between my-2">
                    <Text className="text-textHitam text-xs font-semibold">Status</Text>
                    {
                        !item.lateClockIn && !item.earlyClockOut ?
                        <View className="py-1 px-2 rounded-full" style={{backgroundColor: hexToRgbA('#4BB543', 0.25)}}>
                            <Text className='capitalize' style={{color: '#4BB543'}}>On Time</Text>
                        </View>
                        : 
                        !item.lateClockIn && item.earlyClockOut ?
                        <View className="py-1 px-2 rounded-full" style={{backgroundColor: hexToRgbA('#E54646', 0.25)}}>
                            <Text className='capitalize' style={{color: '#E54646'}}>Early Clock Out</Text>
                        </View>
                        :
                        item.lateClockIn && item.earlyClockOut ?
                        <>
                        <View className="py-1 px-2 rounded-full ml-2" style={{backgroundColor: hexToRgbA('#E54646', 0.25)}}>
                            <Text className='capitalize' style={{color: '#E54646'}}>Late Clock In</Text>
                        </View>
                        <View className="py-1 px-2 rounded-full ml-2" style={{backgroundColor: hexToRgbA('#E54646', 0.25)}}>
                            <Text className='capitalize' style={{color: '#E54646'}}>Early Clock Out</Text>
                        </View>
                        </>
                        : 
                        item.lateClockIn ?
                        <View className="py-1 px-2 rounded-full ml-2" style={{backgroundColor: hexToRgbA('#E54646', 0.25)}}>
                            <Text className='capitalize' style={{color: '#E54646'}}>Late Clock In</Text>
                        </View>
                        : 
                        <View className="py-1 px-2 rounded-full ml-2" style={{backgroundColor: hexToRgbA('#F0AD4E', 0.25)}}>
                            <Text className='capitalize' style={{color: '#F0AD4E'}}>Closed</Text>
                        </View>
                    }
                </View>
                <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                <View className="flex-row items-center justify-between my-2">
                    <Text className="text-textHitam text-xs font-semibold">Location</Text>
                    <Pressable onPress={() => Linking.openURL(handleGoogleMaps(item.clockOutLoc.lat, item.clockOutLoc.long))}>
                        <Text className="text-xs font-normal text-SecondaryNormal italic">open google map</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default AttendanceDetailView