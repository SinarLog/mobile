import { View, Text, FlatList, Pressable, Image } from "react-native"
import { getInitials, hexToRgbA } from "../../utils/helper"
import ChevronRightIcon from "../../assets/chevronRightIcon/chevronRightIcon.png"
import ChevronBackIcon from "../../assets/chevronCloseIcon/chevronCloseIcon.png"
import EmployeeDetailModel from "./Model"
import PATH from "../../Navigator/PathNavigation"

const EmployeeDetailView = ({ navigation, route }) => {
    const { userData, profile } = EmployeeDetailModel({ route })

    return (
        <View className="bg-backgroundHome flex-1">
            <View className="flex-row px-6 pt-6 items-center justify-center">
                <Pressable className="absolute left-6 top-6" onPress={() => navigation.goBack()}>
                    <Image source={ChevronBackIcon}/>
                </Pressable>
                <Text className="text-base text-OTPHitam font-bold">Employee Detail</Text>
            </View>
            <FlatList
                data={profile}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View className="mt-6">
                        <View className="items-center">
                        {
                            item.avatar ? 
                            <Image source={{uri: item.avatar}} style={{width: 100, height: 100, borderRadius: 50}}/>
                            :
                            <View className='rounded-full bg-white items-center justify-center border' style={{width: 100, height:100}}>
                                <Text style={{fontSize:40}}>{getInitials(item.fullName)}</Text>
                            </View>
                        }
                        </View>
                        <View className="bg-white p-4 mx-6 mt-6 rounded-lg">
                            <Text className="text-textHitam text-xs font-medium">Personal Information</Text>
                            <View className="flex-row justify-between mt-4 mb-2">
                                <Text className="text-textHitam text-xs font-normal">Name</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.fullName}</Text>
                            </View>
                            <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                            <View className="flex-row justify-between my-2">
                                <Text className="text-textHitam text-xs font-normal">Email</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.email}</Text>
                            </View>
                            <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                            <View className="flex-row justify-between my-2">
                                <Text className="text-textHitam text-xs font-normal">Phone Number</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.biodata.phoneNumber}</Text>
                            </View>
                            <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                            <View className="flex-row justify-between my-2">
                                <Text className="text-textHitam text-xs font-normal">Gender</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.biodata.gender === 'M' ? 'Male' : 'Female'}</Text>
                            </View>
                            <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                            <View className="flex-row justify-between my-2">
                                <Text className="text-textHitam text-xs font-normal">Date of Birth</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.biodata.birthDate}</Text>
                            </View>
                            <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                            <View className="flex-row justify-between my-2">
                                <Text className="text-textHitam text-xs font-normal">Martial Status</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.biodata.maritalStatus ? 'Married' : 'Single'}</Text>
                            </View>
                        </View>
                        <View className="bg-white p-4 mx-6 mt-6 mb-4 rounded-lg">
                            <Text className="text-textHitam text-xs font-medium">Work Information</Text>
                            <View className="flex-row justify-between mt-4 mb-2">
                                <Text className="text-textHitam text-xs font-normal">Job</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.job.name}</Text>
                            </View>
                            <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                            <View className="flex-row justify-between my-2 items-center">
                                <Text className="text-textHitam text-xs font-normal">Status</Text>
                                <View className="py-1 px-2 rounded-full" style={{backgroundColor: hexToRgbA(item.color, 0.25)}}>
                                    <Text className="font-medium capitalize" style={{color: item.color, fontSize: 10}}>{item.status.replace(/_/g, ' ')}</Text>
                                </View>
                            </View>
                        </View>
                        {
                            userData.id === item.manager.id ?
                            <Pressable className="flex-row mx-6 mt-4 p-4 rounded-lg bg-white items-center justify-between" onPress={() => navigation.navigate(PATH.employeeHistory, { id: item.id })}>
                                <Text className="text-xs text-textHitam font-medium">Employee's History</Text>
                                <Image source={ChevronRightIcon} style={{width:20, height:20}}/>
                            </Pressable>
                            :
                            null
                        }
                    </View>
                )}
            />
        </View>
    )
}

export default EmployeeDetailView