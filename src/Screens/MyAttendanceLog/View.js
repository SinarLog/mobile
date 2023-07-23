import { View, Image, Text, Pressable, FlatList } from "react-native"
import ChevronBackIcon from "../../assets/chevronCloseIcon/chevronCloseIcon.png"
import SliderIcon from "../../assets/sliderIcon/sliderIcon.png"
import CloseIcon from "../../assets/closeIcon/closeIcon.png"
import CheckIcon from "../../assets/checkSmallIcon/checkSmallIcon.png"
import MyAttendanceLogModel from "./Model"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { hexToRgbA } from "../../utils/helper"
import DropDownPicker from "react-native-dropdown-picker"

const MyAttendanceLogView = ({ navigation }) => {
    const { attendanceLogs, bottomSheet, handleBackButton, handleFilterButton } = MyAttendanceLogModel({ navigation })

    return (
        <View className="bg-backgroundHome">
            <View className="bg-white flex-row items-center justify-between pt-7 px-6">
                <Pressable onPress={handleBackButton}>
                    <Image source={ChevronBackIcon}/>
                </Pressable>
                <Text className="text-textHitam text-sm font-semibold">My Attendance Log</Text>
                <Pressable onPress={bottomSheet.handleBottomSheetFilterPresent}>
                    <Image source={SliderIcon} />
                </Pressable>
            </View>
            <FlatList
                data={attendanceLogs}
                keyExtractor={item => item.date}
                showsVerticalScrollIndicator={false}
                className="px-6 mt-4"
                renderItem={({ item }) => (
                    <Pressable className="bg-white mb-2 rounded" onPress={()=> console.log('nyoba wae')}> 
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
                    </Pressable>
                )}
            />
            <BottomSheetModal
                ref={bottomSheet.bottomSheetFilter}
                index={1}
                snapPoints={bottomSheet.snapPoints}
                backdropComponent={bottomSheet.renderBackdrop}
                className="rounded-2xl bg-white"
                >
                <View className="px-8 ">
                    <Pressable className="absolute right-2 top-1" onPress={bottomSheet.handleBottomSheetFilterDismiss}>
                        <Image source={CloseIcon}/>
                    </Pressable>
                    <Text className="text-black font-semibold text-base">Filter</Text>
                    <View className="mt-6">
                        <Text className="text-black font-semibold text-sm mb-4">Status</Text>
                        <FlatList
                            data={bottomSheet.status}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            renderItem={({ item }) => (
                                
                                bottomSheet.selectedStatus.includes(item.title) ?
                                
                                <Pressable 
                                    className="bg-PrimaryNormal flex-row py-2 px-4 rounded-full items-center mr-2 mb-2"
                                    onPress={(event) => bottomSheet.handleRemoveStatus(item.title)}    
                                >
                                    <Text className="text-white text-xs font-semibold mr-2">{item.title}</Text>
                                    <Image source={CheckIcon} />
                                </Pressable>
                                : 
                                <Pressable 
                                    className="border-2 border-PrimaryNormal flex-row py-2 px-4 rounded-full items-center mr-2 mb-2"
                                    onPress={(event) => bottomSheet.handleAddStatus(item.title)}
                                >
                                    <Text className="text-PrimaryNormal text-xs font-semibold mr-2">{item.title}</Text>
                                </Pressable>
                                
                            )}
                        />
                    </View>
                    <View className="mt-3">
                        <Text className="text-black font-semibold text-sm mb-4">Date</Text>
                        <View className="flex-row">
                            <DropDownPicker 
                                open={bottomSheet.dropdownMonth.openMonth}
                                value={bottomSheet.dropdownMonth.valueMonth}
                                items={bottomSheet.dropdownMonth.itemsMonth}
                                setOpen={bottomSheet.dropdownMonth.setOpenMonth}
                                setValue={bottomSheet.dropdownMonth.setValueMonth}
                                onOpen={bottomSheet.dropdownMonth.onMonthOpen}
                                placeholder="Month"
                                listMode="MODAL"
                                containerStyle={{
                                    marginBottom:24,
                                    marginRight:16,
                                    display:"flex", flex:1
                                }}
                                dropDownContainerStyle={{
                                    backgroundColor: 'white',
                                    borderRadius:8,
                                    borderColor: '#E54646',                                    
                                }}
                                textStyle={{
                                    color: '#E54646',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    marginVertical: 8
                                }}
                                arrowIconStyle={{
                                    tintColor: '#E54646',
                                }}
                                className='bg-white rounded-lg border-PrimaryNormal'
                                />
                            <DropDownPicker 
                                open={bottomSheet.dropdownYear.openYear}
                                value={bottomSheet.dropdownYear.valueYear}
                                items={bottomSheet.dropdownYear.itemsYear}
                                setOpen={bottomSheet.dropdownYear.setOpenYear}
                                setValue={bottomSheet.dropdownYear.setValueYear}
                                onOpen={bottomSheet.dropdownYear.onYearOpen}
                                placeholder="Year"
                                listMode="MODAL"
                                containerStyle={{
                                    marginBottom:24,
                                    display:"flex", flex:1,
                                }}
                                dropDownContainerStyle={{
                                    backgroundColor: 'white',
                                    borderRadius:8,
                                    borderColor: '#E54646'
                                }}
                                textStyle={{
                                    color: '#E54646',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    marginVertical: 8
                                }}
                                arrowIconStyle={{
                                    tintColor: '#E54646',
                                }}
                                className='bg-white rounded-lg border-PrimaryNormal'
                            />
                        </View>
                    </View>
                    <View>
                        <Pressable className="bg-PrimaryNormal py-2 px-4 items-center rounded-md" onPress={handleFilterButton}>
                            <Text className="text-base font-normal text-white">Filter</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheetModal>
        </View>
    )
}

export default MyAttendanceLogView