import { Text, View, FlatList, TextInput, Pressable, Image, Modal, TouchableWithoutFeedback } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { useMemo, useState } from "react"
import UploadIcon from "../../assets/uploadIcon/uploadIcon.png"
import CloseIcon from "../../assets/closeIcon/closeIcon.png"
import CalendarIcon from "../../assets/calendarIcon/calendarIcon.png"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { Calendar } from "react-native-calendars"
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isCancel,
    isInProgress,
    types,
  } from 'react-native-document-picker'

const LeaveRequestView = () => {
    const [openLeaveType, setOpenLeaveType] = useState(false)
    const [value, setValue] = useState(null)
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ])
    const data = [{id:0}]

    const date = new Date();
    const initiateDate = date.toISOString().split('T')[0];
    const [selectedStartDate, setSelectedStartDate] = useState(initiateDate)

    const [range, setRange] = useState({})

    const marked = useMemo(() => {
        if(!range.startDate) return {};

        let start = new Date(range.startDate).getTime();
        let end = new Date(range.endDate || range.startDate).getTime();
        let marked = {};

        for(let cur = start; cur <= end; cur += 60 * 60 * 24000) {
            let curStr = new Date(cur).toISOString().substr(0, 10);
            marked[curStr] = {
                selected: true,
                color: (cur == start || cur ==end) ? '#E54646': '#FBE3E3',
                textColor: (cur == start || cur ==end) ? 'white': '#E54646',
                startingDay: cur == start,
                endingDay: cur == end,
            };
        }
        return marked

    },[range])

    const handleDayPress = (day) => {
        if(range.startDate && !range.endDate) {
            // startDate is selected. Complete the range selection
            let newRange = {...range, ...{endDate: day.dateString}};
            // props.onRangeSelected &&
            //   props.onRangeSelected(newRange);
            setRange(newRange);
          }
          else {
            // startDate isn't selected. Start the range selection
            setRange({
              startDate: day.dateString
            });
          }
    }

    const [calendarVisible, setCalendarVisible] = useState(false)

    const [result, setResult] = useState()

    return (
        <View className="bg-white">
            <View className="items-center py-6">

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
                                open={openLeaveType}
                                value={value}
                                items={items}
                                setOpen={setOpenLeaveType}
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
                                className="flex-1 bg-InactiveLightActive rounded-lg border-0 h-10"
                            />
                        </View>
                        <View className="flex-row">
                            <Text className="text-textHitam text-xs font-semibold">Leave Date</Text>
                            <Text className="text-PrimaryNormal text-xs font-semibold"> *</Text>
                        </View>
                        <Pressable onPress={() => setCalendarVisible(true)} className="flex-1 flex-row bg-InactiveLightActive rounded-lg items-center justify-start py-2 mt-2">
                            <Image source={CalendarIcon} style={{width:18,height:20,marginLeft:16}}/>
                            <Text className="ml-3 text-InactiveDarkActive font-semibold text-xs">{range.startDate ? range.startDate + (range.endDate ? ' - ' + range.endDate : '') : 'Date'}</Text>
                        </Pressable>
                        <View className="flex-row mt-6">
                            <Text className="text-textHitam text-xs font-semibold">Reason</Text>
                            <Text className="text-PrimaryNormal text-xs font-semibold"> *</Text>
                        </View>
                        <TextInput 
                            multiline
                            placeholder="Type your reason here!"
                            textAlignVertical="top"
                            style={{
                                borderRadius:8,
                                backgroundColor: '#F3F3F3',
                                alignItems: 'flex-start',
                                height: 169,
                                alignSelf: 'stretch',
                                paddingVertical: 8,
                                paddingHorizontal: 16,
                                marginTop:10
                            }}
                        />
                        <View className="flex-row mt-2">
                            <Text className="text-textHitam text-xs font-semibold">Attachment</Text>
                        </View>
                        <Pressable 
                            className="flex-1 flex-row bg-InactiveLightActive rounded-lg items-center justify-center py-2 mt-2"
                            onPress={ async () => {
                                try {
                                    const pickerResult = await DocumentPicker.pickSingle({
                                        presentationStyle: 'fullScreen',
                                        copyTo: 'cachesDirectory'
                                    })
                                    setResult([pickerResult])
                                } catch (error) {
                                    
                                }
                            }}
                        >
                            <Image source={UploadIcon} style={{width:20, height:20}}/>
                            <Text className="text-InactiveDarker font-semibold ml-4">Choose File</Text>
                        </Pressable>
                        <View className="mt-2 flex-row items-center">
                            <Text className="text-textHitam text-xs font-semibold flex-auto mr-4">your leave exceeds the quota. the remaining leave for [leave type] is X days. Choose one of option below if you want to keep to request leave :</Text>
                            <View className="p-1 rounded-full bg-backgroundHomeItem flex-auto">
                                <Image source={CloseIcon} style={{width:12,height:12,tintColor:'#E54646'}} />
                            </View>
                        </View>
                        <View className="flex-row mt-6">
                            <View className="flex-1 mr-6">
                                <BouncyCheckbox 
                                    onPress={(isChecked) => {}} 
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
                                    className="bg-InactiveLightActive rounded-lg mt-2 py-2 px-4"
                                    placeholder="Input here (Days)"
                                />
                                <Text className="font-normal text-xs">You have 3 Days left</Text>
                            </View>
                            <View className="flex-1">
                                <BouncyCheckbox 
                                    onPress={(isChecked) => {}} 
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
                                    className="bg-InactiveLightActive rounded-lg mt-2 py-2 px-4"
                                    placeholder="Days"
                                />
                            </View>
                        </View>
                        <View className="flex-row mt-6">
                            <Pressable className="flex-1 bg-WarningNormal items-center justify-center py-2 rounded-lg mr-2">
                                <Text className="font-semibold text-base text-white">Check</Text>
                            </Pressable>
                            <Pressable className="flex-1 bg-InactiveNormal items-center justify-center py-2 rounded-lg">
                                <Text className="font-semibold text-base text-InactiveDarker">Send</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            />
            <Modal visible={calendarVisible} transparent animationType="fade" onRequestClose={() => setCalendarVisible(false)}>
                <TouchableWithoutFeedback onPress={() => setCalendarVisible(false)}>
                    <View className="flex-1 justify-center px-6 bg-InactiveDarker/[.6]">
                        <Calendar
                            markingType={'period'}
                            markedDates={marked}
                            onDayPress={handleDayPress}
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
        </View>
    )
}

export default LeaveRequestView