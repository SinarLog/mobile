import { View, Text, TextInput, FlatList, Pressable, Image } from "react-native"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import SearchIcon from "../../../assets/searchIcon/searchIcon.png"
import XCircleIcon from "../../../assets/xCircleIcon/xCircleIcon.png"
import SliderIcon from "../../../assets/sliderIcon/sliderIcon.png"
import CloseIcon from "../../../assets/closeIcon/closeIcon.png"
import NoDataIcon from "../../../assets/noDataIcon/noDataIcon.png"
import { getInitials, hexToRgbA } from "../../../utils/helper"
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"
import DropDownPicker from "react-native-dropdown-picker"
import { getIncomingLeaveProposal, getLeaveProposalHistory } from "../../../Network/ApprovalFlow/RemoteStorage"
import PATH from "../../../Navigator/PathNavigation"

const LeaveView = ({ isFromHistory, navigation }) => {

    const [leaveProposals, setLeaveProposals] = useState([])

    useEffect(() => {
        loadData()
    },[])

    const loadData = async () => {
        try {
            let data
            if (isFromHistory) {
                data = await getLeaveProposalHistory(999999999)
            } else {
                data = await getIncomingLeaveProposal(999999999)
            }
            if (data) {
                const updatedData = data.map(item => {
                    if (item.status === 'PENDING') {
                        return {
                            ...item,
                            color: '#A3A3A3'
                        }
                    } else if (item.status === "APPROVED") {
                        return {
                            ...item,
                            color: '#4BB543'
                        }
                    } else if (item.status === "REJECTED") {
                        return {
                            ...item,
                            color: '#E54646'
                        }
                    }
                    else {
                        return {
                            ...item,
                            color: '#F0AD4E'
                        }
                    }
                })
                setLeaveProposals(updatedData)
            }
        } catch (error) {
            console.log('Error get Leave Proposal ', error)
        }
    }

    const [inputFocused, setInputFocused] = useState(false)
    const [value, setValue] = useState('')

    const [filter, setfilter] = useState([{id:0, title: ''}])
    const handleAddFilter = () => {
        const resetArray = filter.filter((item, _) => item.id === 0)
        let filterArray = [...resetArray]

        if (selectedOrder) {
            const newItem = {id: selectedOrder, title: selectedOrder}
            filterArray = [...filterArray, newItem]
        }
        if (selectedStatus) {
            const newItem = {id: selectedStatus, title: selectedStatus}
            filterArray = [...filterArray, newItem]
        }
        setfilter(filterArray)
    }
    const handleRemoveFilter = (title) => {
        setfilter((prevItems) => {
            const updatedArray = prevItems.filter((item, _) => item.title !== title)
            return updatedArray
        })
    }

    const [selectedOrder, setSelectedOrder] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('')

    const handleClickOrder = (order) => {
        setSelectedOrder(order)
    }
    const handleClickStatus = (status) => {
        setSelectedStatus(status)
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
            let data
            if (isFromHistory) {
                data = await getLeaveProposalHistory(999999999, value, selectedStatus, valueMonth, valueYear, selectedOrder)
            } else {
                data = await getIncomingLeaveProposal(999999999, value, valueMonth, valueYear, selectedOrder)
            }
            if (data) {
                const updatedData = data.map(item => {
                    if (item.status === 'PENDING') {
                        return {
                            ...item,
                            color: '#A3A3A3'
                        }
                    } else if (item.status === "APPROVED") {
                        return {
                            ...item,
                            color: '#4BB543'
                        }
                    } else if (item.status === "REJECTED") {
                        return {
                            ...item,
                            color: '#E54646'
                        }
                    }
                    else {
                        return {
                            ...item,
                            color: '#F0AD4E'
                        }
                    }
                })
                setLeaveProposals(updatedData)
            } else {
                setLeaveProposals([])
            }
        } catch (error) {
            console.log('Error get Leave Proposal with filter', error)
        }
    }

    const handleClickLeaveDetail = (id) => {
        navigation.navigate(PATH.incomingLeaveDetail, { id, isFromHistory })
    }

    return (
        <View>
            <View className="bg-white flex-row items-center justify-between mt-7 mx-6 px-4 py-2 border border-InactiveDarker rounded-full">
                <TextInput
                    placeholder="Search by name"
                    className="text-xs flex-1 mr-2 text-black"
                    onPressIn={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    style={{paddingVertical:0}}
                    value={value}
                    onChangeText={(text) => setValue(text)}
                    onEndEditing={loadDataWithFilter}
                />
                {
                    inputFocused ?
                    <Pressable onPress={() => setValue('')}>
                        <Image source={XCircleIcon} style={{width: 20, height:20}} />
                    </Pressable>
                    :
                    <Pressable>
                        <Image source={SearchIcon} style={{width: 20, height:20}} />
                    </Pressable>
                }
            </View>
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
                data={leaveProposals}
                keyExtractor={item => item.id}
                className="px-6 mt-4"
                renderItem={({ item }) => (
                    <Pressable className="bg-white mb-2 rounded" onPress={() => handleClickLeaveDetail(item.id)}> 
                        <View className="flex-row items-center py-2 justify-between px-4">
                            <View className="flex-row items-center">
                                {
                                    item.avatar ? 
                                    <Image source={{uri: item.avatar}} style={{width: 24, height: 24, borderRadius: 12, marginRight: 8}}/>
                                    :
                                    <View className='w-6 h-6 rounded-full bg-white mr-2 items-center justify-center border'>
                                        <Text style={{fontSize:10}}>{getInitials(item.fullName)}</Text>
                                    </View>
                                }
                                <Text className="text-black text-xs">{item.fullName}</Text>
                            </View>
                            <View className="py-1 px-2 rounded-full" style={{backgroundColor: hexToRgbA(item.color, 0.25)}}>
                                <Text className="font-normal capitalize" style={{fontSize: 10, color: item.color}}>{item.status}</Text>
                            </View>
                        </View>
                        <View className="h-0 bg-InactiveNormal mx-4" style={{borderWidth:0.125}}></View>
                        <View className="px-4 py-2">
                            <View className="flex-row justify-between">
                                <View className="flex-row items-center">
                                    <Text className="text-black text-xs">{item.requestDate}</Text>
                                    <View className="w-1 h-1 bg-textHitam rounded-full mx-2"></View>
                                    <Text className="text-black text-xs">{item.duration} {item.duration > 1 ? 'Days': 'Day'}</Text>
                                </View>
                                <Text className="text-black text-xs capitalize">{item.type}</Text>
                            </View>
                        </View>
                    </Pressable>  
                )}
                ListEmptyComponent={ () => (
                    <View className="bg-white py-4 items-center justify-center rounded">
                        <Image source={NoDataIcon}/>
                        {
                            value || selectedStatus ?

                            <Text className="text-textHitam text-xs font-semibold">No data with { value ? `name ${value} ` : ''} { selectedStatus ? `status ${selectedStatus}` : ''}</Text>
                            :
                            <Text className="text-textHitam text-xs font-semibold">{ isFromHistory ? 'You dont have history leave proposal' : 'You dont have incoming leave proposal'}</Text>
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
                    {
                        isFromHistory ?
                        <View className="mt-6">
                            <Text className="text-black font-semibold text-sm">Status</Text>
                            <Pressable className="flex-row mt-4 mb-2" onPress={(event) => handleClickStatus('Approved')}>
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
                        </View>
                        :
                        null
                    }
                    <View className="mt-3">
                        <Text className="text-black font-semibold text-sm mb-4">Date</Text>
                        <View className="flex-row">
                            <DropDownPicker 
                                open={openMonth}
                                value={valueMonth}
                                items={itemsMonth}
                                setOpen={setOpenMonth}
                                setValue={setValueMonth}
                                onOpen={onMonthOpen}
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
                                open={openYear}
                                value={valueYear}
                                items={itemsYear}
                                setOpen={setOpenYear}
                                setValue={setValueYear}
                                onOpen={onYearOpen}
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

export default LeaveView