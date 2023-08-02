import { Text, View, FlatList, TextInput, Pressable, Image, Modal, TouchableWithoutFeedback } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import UploadIcon from "../../assets/uploadIcon/uploadIcon.png"
import CloseIcon from "../../assets/closeIcon/closeIcon.png"
import ChevronCloseIcon from "../../assets/chevronCloseIcon/chevronCloseIcon.png"
import CalendarIcon from "../../assets/calendarIcon/calendarIcon.png"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import ErrorIcon from "../../assets/errorIcon/errorIcon.png"
import { Calendar } from "react-native-calendars"
import LeaveRequestModel from "./Model"
import { BottomSheetModal } from "@gorhom/bottom-sheet"

const LeaveRequestView = ({ navigation }) => {
    const { dropdown, datePicker, reasonInput, filePicker, validation, leakage, bottomSheet } = LeaveRequestModel({ navigation })

    const data = [{id:0}]

    return (
        <View className="flex-1 bg-white">
            <View className="bg-white flex-row p-6 items-center justify-center">
                <Pressable className="absolute left-6" onPress={() => navigation.goBack()}>
                    <Image source={ChevronCloseIcon}/>
                </Pressable>
                <Text className="text-OTPHitam text-base font-bold">Leave Request</Text>
            </View>
            <FlatList 
                data={data}
                keyExtractor={ item => item.id }
                renderItem={ ({item}) => (
                    <View className="px-6 mt-2">
                        <View className="flex-row">
                            <Text className="text-textHitam text-xs font-semibold">Leave Type</Text>
                            <Text className="text-PrimaryNormal text-xs font-semibold"> *</Text>
                        </View>
                        <View style={{ zIndex: 100 }}>
                            <DropDownPicker 
                                open={dropdown.openLeaveType}
                                value={dropdown.value}
                                items={dropdown.items}
                                setOpen={dropdown.setOpenLeaveType}
                                setValue={dropdown.setValue}
                                placeholder="Leave type"
                                containerStyle={{
                                    marginTop:10,
                                    marginBottom:24
                                }}
                                dropDownContainerStyle={{
                                    backgroundColor: 'white',
                                    borderRadius:8,
                                    marginTop:8
                                }}
                                className={`flex-1 bg-InactiveLightActive rounded-lg h-10 ${ validation.error.leaveType ? 'border-PrimaryNormal' : 'border-0'}`}
                            />
                        </View>
                        <View className="flex-row">
                            <Text className="text-textHitam text-xs font-semibold">Leave Date</Text>
                            <Text className="text-PrimaryNormal text-xs font-semibold"> *</Text>
                        </View>
                        <Pressable 
                            onPress={() => datePicker.setCalendarVisible(true)} 
                            className={`flex-1 flex-row bg-InactiveLightActive rounded-lg items-center justify-start py-2 mt-2 ${ validation.error.reason ? 'border-PrimaryNormal': ''}`}
                            style={{
                                borderWidth: validation.error.reason ? 1 : 0,
                            }}
                        >
                            <Image source={CalendarIcon} style={{width:18,height:20,marginLeft:16}}/>
                            <Text className="ml-3 text-InactiveDarkActive font-semibold text-xs">{datePicker.range.startDate ? datePicker.range.startDate + (datePicker.range.endDate ? ' - ' + datePicker.range.endDate : '') : 'Date'}</Text>
                        </Pressable>
                        <View className="flex-row mt-6">
                            <Text className="text-textHitam text-xs font-semibold">Reason</Text>
                            <Text className="text-PrimaryNormal text-xs font-semibold"> *</Text>
                        </View>
                        <TextInput 
                            multiline
                            placeholder="Type your reason here!"
                            textAlignVertical="top"
                            value={reasonInput.reason}
                            onChangeText={reasonInput.handleInputReason}
                            maxLength={100}
                            style={{
                                borderRadius:8,
                                backgroundColor: '#F3F3F3',
                                alignItems: 'flex-start',
                                height: 169,
                                alignSelf: 'stretch',
                                paddingVertical: 8,
                                paddingHorizontal: 16,
                                marginTop:10,
                                borderWidth: validation.error.reason ? 1 : 0,
                                color: "black"
                            }}
                            className={`${ validation.error.reason ? 'border-PrimaryNormal' : ''}`}
                        />
                        <View className="flex-row mt-2">
                            <Text className="text-textHitam text-xs font-semibold">Attachment</Text>
                        </View>
                        <Pressable 
                            className="flex-1 flex-row bg-InactiveLightActive rounded-lg items-center justify-center py-2 mt-2"
                            onPress={ filePicker.handleFilePicker }
                        >
                            {
                                filePicker.file.length > 0 ?
                                <Text className="text-InactiveDarker font-semibold mr-4">{filePicker.file[0]?.name}</Text>
                                : null
                            }
                            <Image source={UploadIcon} style={{width:20, height:20}}/>
                            {
                                filePicker.file.length <= 0 ?
                                <Text className="text-InactiveDarker font-semibold ml-4">Choose File</Text>
                                : null
                            }
                        </Pressable>
                        {
                            validation.isLeakage.isLeaveLeakage ? 
                            <View>
                                {
                                    leakage.closeReminder ?
                                    <View className="mt-2 flex-row items-center">
                                        <Text className="text-textHitam text-xs font-semibold flex-auto mr-4">your leave exceeds the quota. the remaining leave for {dropdown.value} is {validation.isLeakage.remainingQuotaForRequestedType} days. The excess in your leave request made is {validation.isLeakage.excessLeaveDuration} days. Choose one of option below if you want to keep to request leave :</Text>
                                        <Pressable className="p-1 rounded-full bg-backgroundHomeItem flex-auto" onPress={leakage.handleCloseReminder}>
                                            <Image source={CloseIcon} style={{width:12,height:12,tintColor:'#E54646'}} />
                                        </Pressable>
                                    </View>
                                    : null
                                }
                                <View className="flex-row mt-6">
                                    <View className="flex-1 mr-6">
                                        <BouncyCheckbox 
                                            onPress={(isChecked) => {
                                                leakage.handleCheckbox('annual',isChecked)
                                                leakage.handleInputLeakage('annual', '')
                                            }} 
                                            textContainerStyle={{tintColor:'#2D2D2D'}}
                                            iconStyle={{
                                                borderRadius:4
                                            }}
                                            innerIconStyle={{
                                                borderRadius:4,
                                                borderColor:'#1A2B88',
                                            }}
                                            textStyle={{
                                                textDecorationLine: "none",
                                                fontSize:12,
                                                fontWeight:600,
                                                color: '#2D2D2D'
                                            }}
                                            fillColor="#1A2B88"
                                            text="Annual"
                                        />
                                        <TextInput 
                                            className="bg-InactiveLightActive rounded-lg mt-2 py-2 px-4 text-black"
                                            placeholder="Input here (Days)"
                                            editable={leakage.checkbox.annual}
                                            value={leakage.inputLeakage.annual}
                                            onChangeText={(text) => leakage.handleInputLeakage('annual', text)}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <View className="flex-1">
                                        <BouncyCheckbox 
                                            onPress={(isChecked) => {
                                                leakage.handleCheckbox('unpaid',isChecked)
                                                leakage.handleInputLeakage('unpaid', '')
                                            }} 
                                            textContainerStyle={{tintColor:'#2D2D2D'}}
                                            iconStyle={{
                                                borderRadius:4
                                            }}
                                            innerIconStyle={{
                                                borderRadius:4,
                                                borderColor:'#1A2B88',
                                            }}
                                            textStyle={{
                                                textDecorationLine: "none",
                                                fontSize:12,
                                                fontWeight:600,
                                                color: '#2D2D2D'
                                            }}
                                            fillColor="#1A2B88"
                                            text="Unpaid"
                                            />
                                        <TextInput 
                                            className="bg-InactiveLightActive rounded-lg mt-2 py-2 px-4 text-black"
                                            placeholder="Days"
                                            editable={leakage.checkbox.unpaid}
                                            value={leakage.inputLeakage.unpaid}
                                            onChangeText={(text) => leakage.handleInputLeakage('unpaid', text)}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>
                            </View>
                            : null
                        }
                        <View className="flex-row mt-6">
                            <Pressable className="flex-1 bg-WarningNormal items-center justify-center py-2 rounded-lg mr-2" onPress={validation.handleCheckButton}>
                                <Text className="font-semibold text-base text-white">Check</Text>
                            </Pressable>
                            <Pressable 
                                className={`flex-1 ${ validation.enableSend ? 'bg-PrimaryNormal' :'bg-InactiveNormal'} items-center justify-center py-2 rounded-lg`}
                                disabled={!validation.enableSend}
                                onPress={validation.handleSendButton}
                            >
                                <Text className={`font-semibold text-base ${ validation.enableSend ? 'text-white' : 'text-InactiveDarker'}`}>Send</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            />
            <Modal visible={datePicker.calendarVisible} transparent animationType="fade" onRequestClose={() => datePicker.setCalendarVisible(false)}>
                <TouchableWithoutFeedback onPress={() => datePicker.setCalendarVisible(false)}>
                    <View className="flex-1 justify-center px-6 bg-InactiveDarker/[.6]">
                        <Calendar
                            markingType={'period'}
                            markedDates={datePicker.marked}
                            onDayPress={datePicker.handleDayPress}
                            minDate={datePicker.initDate}
                            theme={{
                                'stylesheet.calendar.header': {
                                    dayTextAtIndex0: {
                                        color: '#F36A6A'
                                    },
                                    dayTextAtIndex6: {
                                        color: '#F36A6A'
                                    }
                                }
                            }}
                            style={{
                                borderRadius:8,
                                padding:10
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <BottomSheetModal
                ref={bottomSheet.bottomSheetError}
                index={1}
                snapPoints={bottomSheet.snapPoints}
                backdropComponent={bottomSheet.renderBackdrop}
                className="rounded-2xl bg-white"
            >
                <View className="items-center px-8 ">
                    <Pressable className="absolute right-2 top-1" onPress={bottomSheet.handleBottomSheetErrorDismiss}>
                        <Image source={CloseIcon}/>
                    </Pressable>
                    <Image source={ErrorIcon} style={{width:60, height:60}}/>
                    <Text className="text-black font-semibold text-xl">Error</Text>
                    <Text className="text-black font-medium text-xs text-center mt-4">{bottomSheet.errorMessage}</Text>
                </View>
            </BottomSheetModal>
        </View>
    )
}

export default LeaveRequestView