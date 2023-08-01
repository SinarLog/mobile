import { View, Text, ImageBackground, Image, Pressable, TextInput, FlatList } from "react-native"
import homeBackgroundIcon from "../../assets/homeSmallBackgroundIcon/homeSmallBackgroundIcon.png"
import SearchIcon from "../../assets/searchIcon/searchIcon.png"
import XCircleIcon from "../../assets/xCircleIcon/xCircleIcon.png"
import EmployeeModel from "./Model"
import DropDownPicker from "react-native-dropdown-picker"
import { getInitials, hexToRgbA } from "../../utils/helper"

const EmployeeView = ({ navigation }) => {
    const { employeeList, searchView, dropdown, handleDetailEmployee } = EmployeeModel({ navigation })

    return (
        <View className="flex-1 bg-backgroundHome">
            <ImageBackground source={homeBackgroundIcon} style={{height:120, width:'100%', display:"flex", justifyContent:"flex-end"}}>
                {
                    searchView.search ?
                    <View className="bg-white flex-row items-center justify-between mx-6 mb-6 py-2 px-4 rounded-full">
                        <TextInput
                            placeholder="Search by name"
                            style={{padding:0, color:"black"}}
                            maxLength={30}
                        />
                        <Pressable onPress={() => searchView.setSearch(false)}>
                            <Image source={XCircleIcon} style={{width: 20, height: 20}}/>
                        </Pressable>
                    </View>
                    :
                    <View className="flex-row items-center justify-between mx-6 mb-6">
                        <Text className="text-InactiveLight text-base font-bold">Employee</Text>
                        <Pressable onPress={() => searchView.setSearch(true)}>
                            <Image source={SearchIcon} style={{width: 20, height: 20, tintColor: '#FBFBFB'}}/>
                        </Pressable>
                    </View>
                }
            </ImageBackground>
            <View className="mx-6 z-50">
                <DropDownPicker 
                    open={dropdown.openJobType}
                    value={dropdown.value}
                    items={dropdown.items}
                    setOpen={dropdown.setopenJobType}
                    setValue={dropdown.setValue}
                    onChangeValue={(value) => dropdown.loadDataWithFilter(value)}
                    placeholder="Filter by Job"
                    containerStyle={{
                        marginTop:16,
                        marginBottom:8,
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: 'white',
                        borderRadius:8,
                        marginTop:8,
                        borderWidth:0
                    }}
                    className={`flex-1 bg-white rounded-lg border-0`}
                />
            </View>
            <FlatList
                data={employeeList}
                keyExtractor={item => item.id}
                className="mt-14"
                renderItem={({ item }) => (
                    <Pressable className="bg-white flex-row items-center mx-6 py-2 px-4 mb-2 rounded-lg" onPress={() => handleDetailEmployee(item.id)}>
                        {
                            item.avatar ? 
                            <Image source={{uri: item.avatar}} style={{width: 32, height: 32, borderRadius: 16}}/>
                            :
                            <View className='rounded-full bg-white items-center justify-center border' style={{width: 32, height:32}}>
                                <Text style={{fontSize:12}}>{getInitials(item.fullName)}</Text>
                            </View>
                        }
                        <View className="flex-1 ml-2">
                            <Text className="text-textHitam text-xs font-normal">{item.fullName}</Text>
                            <View className="flex-row items-center justify-between mt-2">
                                <Text className="text-textHitam text-xs font-semibold">{item.job}</Text>
                                <View className="py-1 px-2 rounded-full" style={{backgroundColor: hexToRgbA(item.color, 0.25)}}>
                                    <Text className="font-normal capitalize" style={{color: item.color, fontSize: 10}}>{item.status.replace(/_/g, ' ')}</Text>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    )
}

export default EmployeeView