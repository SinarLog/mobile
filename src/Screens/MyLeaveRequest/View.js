import { View, Image, Text, Pressable, FlatList } from "react-native"
import ChevronBackIcon from "../../assets/chevronCloseIcon/chevronCloseIcon.png"
import SliderIcon from "../../assets/sliderIcon/sliderIcon.png"
import CloseIcon from "../../assets/closeIcon/closeIcon.png"
import MyLeaveRequestModel from "./Model"
import { hexToRgbA } from "../../utils/helper"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import DropDownPicker from "react-native-dropdown-picker"

const MyLeaveRequestView = ({ navigation }) => {
    const { leaveRequest, bottomSheet, selectedOrder, selectedStatus, dropdownMonth, dropdownYear, handleClickOrder, handleClickStatus, handleBackButton, handleFilterButton } = MyLeaveRequestModel({ navigation })

    return (

        <View className="bg-backgroundHome">
            <View className="bg-white flex-row items-center justify-between pt-7 px-6">
                <Pressable onPress={handleBackButton}>
                    <Image source={ChevronBackIcon}/>
                </Pressable>
                <Text className="text-textHitam text-sm font-semibold">My Leave Request</Text>
                <Pressable onPress={bottomSheet.handleBottomSheetFilterPresent}>
                    <Image source={SliderIcon} />
                </Pressable>
            </View>
            <FlatList
                data={leaveRequest}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                className="px-6 mt-4"
                renderItem={({ item }) => (
                    <Pressable className="bg-white mb-2 rounded" onPress={()=> console.log('nyoba wae')}> 
                        <View className="flex-row justify-between py-2 px-2">
                            <Text className="text-black text-xs">{item.leaveType}</Text>
                            <Text className="text-black text-xs">{item.duration} {item.duration > 1 ? 'Days': 'Day'}</Text>
                        </View>
                        <View className="flex-row justify-between py-2 px-2">
                            <View className="flex-row items-center">
                                    <Text className="text-black text-xs">{item.from}</Text>
                                    <View className="bg-textHitam w-1 h-1 rounded-full mx-2"></View>
                                    <Text className="text-black text-xs">{item.to}</Text>
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
                        <Text className="text-black font-semibold text-sm">Request Date</Text>
                        <Pressable className="flex-row mt-4 mb-2" onPress={(event) => handleClickOrder('Ascending')}>
                            {
                                selectedOrder === 'Ascending' ?
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center">
                                    <View className="bg-PrimaryNormal rounded-full" style={{width:10, height:10}}></View>
                                </View>
                                :
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center"></View>

                            }
                            <Text className="text-textHitam font-semibold text-xs ml-4">Ascending</Text>
                        </Pressable>
                        <Pressable className="flex-row mb-2" onPress={(event) => handleClickOrder('Descending')}>
                            {
                                selectedOrder === 'Descending' ?
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center">
                                    <View className="bg-PrimaryNormal rounded-full" style={{width:10, height:10}}></View>
                                </View>
                                :
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center"></View>

                            }
                            <Text className="text-textHitam font-semibold text-xs ml-4">Descending</Text>
                        </Pressable>
                    </View>
                    <View className="mt-6">
                        <Text className="text-black font-semibold text-sm mb-4">Status</Text>
                        <Pressable className="flex-row mb-2" onPress={(event) => handleClickStatus('Approved')}>
                            {
                                selectedStatus === 'Approved' ?
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center">
                                    <View className="bg-PrimaryNormal rounded-full" style={{width:10, height:10}}></View>
                                </View>
                                :
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center"></View>

                            }
                            <Text className="text-textHitam font-semibold text-xs ml-4">Approved</Text>
                        </Pressable>
                        <Pressable className="flex-row mb-2" onPress={(event) => handleClickStatus('Rejected')}>
                            {
                                selectedStatus === 'Rejected' ?
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center">
                                    <View className="bg-PrimaryNormal rounded-full" style={{width:10, height:10}}></View>
                                </View>
                                :
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center"></View>

                            }
                            <Text className="text-textHitam font-semibold text-xs ml-4">Rejected</Text>
                        </Pressable>
                        <Pressable className="flex-row mb-2" onPress={(event) => handleClickStatus('Closed')}>
                            {
                                selectedStatus === 'Closed' ?
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center">
                                    <View className="bg-PrimaryNormal rounded-full" style={{width:10, height:10}}></View>
                                </View>
                                :
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center"></View>

                            }
                            <Text className="text-textHitam font-semibold text-xs ml-4">Closed</Text>
                        </Pressable>
                        <Pressable className="flex-row mb-2" onPress={(event) => handleClickStatus('Pending')}>
                            {
                                selectedStatus === 'Pending' ?
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center">
                                    <View className="bg-PrimaryNormal rounded-full" style={{width:10, height:10}}></View>
                                </View>
                                :
                                <View className="border-2 w-4 h-4 rounded-full border-PrimaryNormal items-center justify-center"></View>

                            }
                            <Text className="text-textHitam font-semibold text-xs ml-4">Pending</Text>
                        </Pressable>
                        {/* <FlatList
                            data={status}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            renderItem={({ item }) => (
                                
                                selectedStatus.includes(item.title) ?
                                
                                <Pressable 
                                    className="bg-PrimaryNormal flex-row py-2 px-4 rounded-full items-center mr-2 mb-2"
                                    onPress={(event) => handleRemoveStatus(item.title)}    
                                >
                                    <Text className="text-white text-xs font-semibold mr-2">{item.title}</Text>
                                    <Image source={CheckIcon} />
                                </Pressable>
                                : 
                                <Pressable 
                                    className="border-2 border-PrimaryNormal flex-row py-2 px-4 rounded-full items-center mr-2 mb-2"
                                    onPress={(event) => handleAddStatus(item.title)}
                                >
                                    <Text className="text-PrimaryNormal text-xs font-semibold mr-2">{item.title}</Text>
                                </Pressable>
                                
                            )}
                        /> */}
                    </View>
                    <View className="mt-3">
                        <Text className="text-black font-semibold text-sm mb-4">Date</Text>
                        <View className="flex-row">
                            <DropDownPicker 
                                open={dropdownMonth.openMonth}
                                value={dropdownMonth.valueMonth}
                                items={dropdownMonth.itemsMonth}
                                setOpen={dropdownMonth.setOpenMonth}
                                setValue={dropdownMonth.setValueMonth}
                                onOpen={dropdownMonth.onMonthOpen}
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
                                open={dropdownYear.openYear}
                                value={dropdownYear.valueYear}
                                items={dropdownYear.itemsYear}
                                setOpen={dropdownYear.setOpenYear}
                                setValue={dropdownYear.setValueYear}
                                onOpen={dropdownYear.onYearOpen}
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

export default MyLeaveRequestView