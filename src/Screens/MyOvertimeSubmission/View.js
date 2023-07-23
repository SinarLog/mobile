import ChevronBackIcon from "../../assets/chevronCloseIcon/chevronCloseIcon.png"
import SliderIcon from "../../assets/sliderIcon/sliderIcon.png"
import CloseIcon from "../../assets/closeIcon/closeIcon.png"
const { BottomSheetModal } = require("@gorhom/bottom-sheet")
import { View, Image, Text, Pressable, FlatList } from "react-native"
import { hexToRgbA } from "../../utils/helper"
import MyOvertimeSubmissionModel from "./Model"
import DropDownPicker from "react-native-dropdown-picker"

const MyOvertimeSubmissionView = ({ navigation }) => {
    const { overtimeSubmissions, bottomSheet, handleBackButton, handleFilterButton, handleDetailOvertime } = MyOvertimeSubmissionModel({ navigation })
    return (
        <View className="bg-backgroundHome">
            <View className="bg-white flex-row items-center justify-between pt-7 px-6">
                <Pressable onPress={handleBackButton}>
                    <Image source={ChevronBackIcon}/>
                </Pressable>
                <Text className="text-textHitam text-sm font-semibold">My Overtime Submissions</Text>
                <Pressable onPress={bottomSheet.handleBottomSheetFilterPresent}>
                    <Image source={SliderIcon} />
                </Pressable>
            </View>
            <FlatList
                data={overtimeSubmissions}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                className="px-6 mt-4"
                renderItem={({ item }) => (
                    <Pressable className="bg-white mb-2 rounded" onPress={()=> handleDetailOvertime(item.id)}> 
                        <View className="flex-row py-2 px-2">
                            <Text className="text-black text-xs">{item.requestDate}</Text>
                        </View>
                        <View className="flex-row justify-between py-2 px-2">
                            <View className="flex-row items-center">
                                    <Text className="text-black text-xs">{item.duration}</Text>
                                </View>
                            <View className="py-1 px-2 rounded-full" style={{backgroundColor: hexToRgbA(item.color, 0.25)}}>
                                <Text className='capitalize' style={{color: item.color, fontSize:10}}>{item.status}</Text>
                            </View>
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
                        <Pressable className="flex-row mb-2" onPress={(event) => bottomSheet.handleClickStatus('Approved')}>
                            {
                                bottomSheet.selectedStatus === 'Approved' ?
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center">
                                    <View className="bg-PrimaryNormal rounded-full" style={{width:10, height:10}}></View>
                                </View>
                                :
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center"></View>

                            }
                            <Text className="text-textHitam font-semibold text-xs ml-4">Approved</Text>
                        </Pressable>
                        <Pressable className="flex-row mb-2" onPress={(event) => bottomSheet.handleClickStatus('Rejected')}>
                            {
                                bottomSheet.selectedStatus === 'Rejected' ?
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center">
                                    <View className="bg-PrimaryNormal rounded-full" style={{width:10, height:10}}></View>
                                </View>
                                :
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center"></View>

                            }
                            <Text className="text-textHitam font-semibold text-xs ml-4">Rejected</Text>
                        </Pressable>
                        <Pressable className="flex-row mb-2" onPress={(event) => bottomSheet.handleClickStatus('Closed')}>
                            {
                                bottomSheet.selectedStatus === 'Closed' ?
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center">
                                    <View className="bg-PrimaryNormal rounded-full" style={{width:10, height:10}}></View>
                                </View>
                                :
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center"></View>

                            }
                            <Text className="text-textHitam font-semibold text-xs ml-4">Closed</Text>
                        </Pressable>
                        <Pressable className="flex-row mb-2" onPress={(event) => bottomSheet.handleClickStatus('Pending')}>
                            {
                                bottomSheet.selectedStatus === 'Pending' ?
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center">
                                    <View className="bg-PrimaryNormal rounded-full" style={{width:10, height:10}}></View>
                                </View>
                                :
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center"></View>

                            }
                            <Text className="text-textHitam font-semibold text-xs ml-4">Pending</Text>
                        </Pressable>
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

export default MyOvertimeSubmissionView