import { View, Text, FlatList, Pressable, Image } from "react-native"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import SliderIcon from "../../../assets/sliderIcon/sliderIcon.png"
import CloseIcon from "../../../assets/closeIcon/closeIcon.png"
import CheckIcon from "../../../assets/checkSmallIcon/checkSmallIcon.png"
import NoDataIcon from "../../../assets/noDataIcon/noDataIcon.png"
import { hexToRgbA } from "../../../utils/helper"
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"
import { getMyEmployeesAttendance } from "../../../Network/EmployeeFlow/RemoteStorage"

const AttendanceView = ({ id }) => {
    
    const [attendanceStaff, setAttendanceStaff] = useState([])

    useEffect(() => {
        loadData()
    },[])

    const loadData = async () => {
        try {
            const data = await getMyEmployeesAttendance(id)
            if (data) {
                setAttendanceStaff(data)
            }
            
        } catch (error) {
            console.log('Error get Staff attendance ', error)
        }
    }

    const status = [
        {id: 0, title: "Early Clock Out"},
        {id: 1, title: "Late Clock In"},
        {id: 2, title: "Closed"},
    ]

    const [selectedStatus, setSelectedStatus] = useState([])
    const handleAddStatus = (stat) => {
        const updatedArray = [...selectedStatus, stat]
        setSelectedStatus(updatedArray)
    }
    
    const handleRemoveStatus = (stat) => {
        const updatedArray = selectedStatus.filter(item => item !== stat)
        setSelectedStatus(updatedArray)
    }

    const [inputFocused, setInputFocused] = useState(false)
    const [value, setValue] = useState('')

    const [filter, setfilter] = useState([{id:0, title: ''}])
    const handleAddFilter = () => {
        const resetArray = filter.filter((item, _) => item.id === 0)
        let filterArray = [...resetArray]

        const newItem = selectedStatus.map( item => {
            const stat = {id: item, title: item}
            return stat
        })
        console.log(newItem);
        filterArray = [...filterArray, newItem]
        console.log(filterArray);
        setfilter(filterArray)
    }
    const handleRemoveFilter = (title) => {
        setfilter((prevItems) => {
            const updatedArray = prevItems.filter((item, _) => item.title !== title)
            return updatedArray
        })
    }

    const [openMonth, setOpenMonth] = useState(false)
    const [valueMonth, setValueMonth] = useState()
    const [itemsMonth] = useState([
        { label: 'January', value: 1 },
        { label: 'February', value: 2 },
        { label: 'March', value: 3 },
        { label: 'April', value: 4 },
        { label: 'May', value: 5 },
        { label: 'June', value: 6 },
        { label: 'July', value: 7 },
        { label: 'August', value: 8 },
        { label: 'September', value: 9 },
        { label: 'October', value: 10 },
        { label: 'November', value: 11 },
        { label: 'December', value: 12 },
    ])
    const onMonthOpen = useCallback(() => {
        setOpenYear(false)
    },[])

    const [openYear, setOpenYear] = useState(false)
    const [valueYear, setValueYear] = useState()
    const [itemsYear] = useState([
        { label: '2019', value: 2019 },
        { label: '2020', value: 2020 },
        { label: '2021', value: 2021 },
        { label: '2022', value: 2022 },
        { label: '2023', value: 2023 },
        { label: '2024', value: 2024 },
        { label: '2025', value: 2025 },
    ])
    const onYearOpen = useCallback(() => {
        setOpenMonth(false)
    },[])

    const bottomSheetFilter = useRef(null)
    const snapPoints = useMemo(() => ['25%','40%','70%','100%'],[])
    const handleBottomSheetFilterPresent = useCallback(() => {
        bottomSheetFilter.current?.present()
    },[])
    const handleBottomSheetFilterDismiss = useCallback(() => {
        bottomSheetFilter.current?.dismiss()
    },[])
    const renderBackdrop = useCallback( 
        props => (
            <BottomSheetBackdrop
            {...props}
            appearsOnIndex={1}
            disappearsOnIndex={0}
        />
        )
    ,[])
    const handleFilterButton = async () => {
        await loadDataWithFilter()
        handleAddFilter()
        handleBottomSheetFilterDismiss()
    }

    const loadDataWithFilter = async () => {
        try {
            const data = await getMyEmployeesAttendance(id, selectedStatus, valueMonth, valueYear)
            if (data) {
                setAttendanceStaff(data)
            }
            else {
                setAttendanceStaff([])
            }
            
        } catch (error) {
            console.log('Error get Staff attendance ', error)
        }
    }

    return (
        <View>
            <FlatList
                data={filter}
                keyExtractor={item => item.id}
                horizontal={true}
                className="pl-6 mt-2"
                renderItem={({ item }) => (
                    item.id === 0 ?

                    <Pressable className="flex-row px-4 py-2 border border-PrimaryNormal rounded-full mr-2" onPress={handleBottomSheetFilterPresent}>
                        <Image source={SliderIcon} style={{width:16, height: 16, marginRight:10, tintColor: "#E54646"}}/>
                        <Text className="text-xs font-medium text-PrimaryNormal">Filter</Text>
                    </Pressable>
                    : 
                    <View className="flex-row px-4 py-2 bg-PrimaryNormal rounded-full items-center mr-2">
                        <Text className="text-white font-semibold text-xs">{item.title}</Text>
                        <Pressable onPress={() => handleRemoveFilter(item.title)}>
                            <Image source={CloseIcon} style={{width: 16, height:16, marginLeft: 10, tintColor: "#FFFFFF"}}/>
                        </Pressable>
                    </View>
                )}
            />
            <FlatList
                data={attendanceStaff}
                keyExtractor={item => item.id}
                className="px-6 mt-4 mb-12"
                renderItem={({ item }) => (
                    <Pressable className="bg-white mb-2 rounded"> 
                        <View className="flex-row justify-between py-2 px-2">
                            <Text className="text-black text-xs">{item.date}</Text>
                            <View className="flex-row py-2 px-2">
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
                ListEmptyComponent={ () => (
                    <View className="bg-white py-4 items-center justify-center rounded">
                        <Image source={NoDataIcon}/>
                        {
                            value || selectedStatus ?

                            <Text className="text-textHitam text-xs font-semibold">No data with { value ? `name ${value} ` : ''}</Text>
                            :
                            <Text className="text-textHitam text-xs font-semibold">Your staffs don't have any attendances</Text>
                        }
                    </View>
                )}
            />
            <BottomSheetModal
                ref={bottomSheetFilter}
                index={1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                className="rounded-2xl bg-white"
            >
                <View className="px-8 ">
                    <Pressable className="absolute right-2 top-1" onPress={handleBottomSheetFilterDismiss}>
                        <Image source={CloseIcon}/>
                    </Pressable>
                    <Text className="text-black font-semibold text-base">Filter</Text>
                    <View className="mt-6">
                        <Text className="text-black font-semibold text-sm mb-4">Status</Text>
                        <FlatList
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
                        />
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

export default AttendanceView