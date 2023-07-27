import { View, Text, FlatList, Pressable, Image } from "react-native"
import ProfileModel from "./Model"
import { getInitials, hexToRgbA } from "../../utils/helper"
import ChevronRightIcon from "../../assets/chevronRightIcon/chevronRightIcon.png"
import CloseIcon from "../../assets/closeIcon/closeIcon.png"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import PATH from "../../Navigator/PathNavigation"

const ProfileView = ({ navigation }) => {
    const { profile, bottomSheet } = ProfileModel({ navigation })

    return (
        <View className="bg-backgroundHome flex-1">
            <View className="bg-white items-center pt-6 pb-2">
                <Text className="text-OTPHitam text-base font-bold">Profile</Text>
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
                                <Text className="text-textHitam text-xs font-normal">Date of Birth</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.biodata.birthDate}</Text>
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
                                <Text className="text-textHitam text-xs font-normal">Martial Status</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.biodata.maritalStatus ? 'Married' : 'Single'}</Text>
                            </View>
                            <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                            <View className="flex-row justify-between my-2">
                                <Text className="text-textHitam text-xs font-normal">Religion</Text>
                                <Text className="text-textHitam text-xs font-medium capitalize">{item.biodata.religion}</Text>
                            </View>
                            <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                            <View className="flex-row justify-between my-2">
                                <Text className="text-textHitam text-xs font-normal">NIK</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.biodata.nik}</Text>
                            </View>
                            <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                            <View className="flex-row justify-between my-2">
                                <Text className="text-textHitam text-xs font-normal">NPWP</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.biodata.npwp}</Text>
                            </View>
                        </View>
                        <View className="bg-white p-4 mx-6 mt-6 mb-4 rounded-lg">
                            <Text className="text-textHitam text-xs font-medium">Work Information</Text>
                            <View className="flex-row justify-between mt-4 mb-2">
                                <Text className="text-textHitam text-xs font-normal">Employment Type</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.contractType}</Text>
                            </View>
                            <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                            <View className="flex-row justify-between my-2">
                                <Text className="text-textHitam text-xs font-normal">Job</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.job.name}</Text>
                            </View>
                            <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                            <View className="flex-row justify-between my-2">
                                <Text className="text-textHitam text-xs font-normal">Role</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.role.name}</Text>
                            </View>
                            <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                            <View className="flex-row justify-between my-2">
                                <Text className="text-textHitam text-xs font-normal">Join Date</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.joinDate}</Text>
                            </View>
                            <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                            <View className="flex-row justify-between my-2">
                                <Text className="text-textHitam text-xs font-normal">Leave Quota</Text>
                                <Text className="text-textHitam text-xs font-medium">{item.leaveQuota.yearlyCount + item.leaveQuota.unpaidCount + item.leaveQuota.marriageCount}</Text>
                            </View>
                            <View style={{borderColor: "#F3F3F3", borderWidth: 0.5}}></View>
                            <View className="flex-row justify-between my-2 items-center">
                                <Text className="text-textHitam text-xs font-normal">Status</Text>
                                <View className="py-1 px-2 rounded-full" style={{backgroundColor: hexToRgbA("#4BB543", 0.25)}}>
                                    <Text className="font-medium capitalize" style={{color: "#4BB543", fontSize: 10}}>{item.status}</Text>
                                </View>
                            </View>
                        </View>
                        <FlatList 
                            data={item.emergencyContacts}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View className="bg-white p-4 mx-6 rounded-lg mb-4">
                                    <Text className="text-textHitam text-xs font-medium">Emergency Contact Information</Text>
                                    <View className="rounded-lg border-InactiveNormal mt-4 py-2 px-4" style={{borderWidth:0.5}}>
                                        <Text className="text-textHitam text-xs font-normal">{item.fullName}</Text>
                                        <View className="flex-row items-center justify-between mt-4">
                                            <Text className="text-textHitam text-xs font-normal">{item.phoneNumber}</Text>
                                            <Text className="text-textHitam text-xs font-normal capitalize">{item.relation}</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                        <Pressable className="py-2 px-4 bg-SuccessNormal rounded-md items-center mx-6" onPress={() => navigation.navigate(PATH.editProfile)}>
                            <Text className="text-white text-base font-normal">Edit profile</Text>
                        </Pressable>
                        <Pressable className="flex-row mx-6 mt-4 p-4 rounded-lg bg-white items-center justify-between" onPress={() => navigation.navigate(PATH.updatePassword)}>
                            <Text className="text-xs text-textHitam font-medium">Update Password</Text>
                            <Image source={ChevronRightIcon} style={{width:20, height:20}}/>
                        </Pressable>
                        <Pressable className="flex-row mx-6 mt-4 p-4 rounded-lg bg-white items-center justify-between" onPress={() => navigation.navigate(PATH.activityLog)}>
                            <Text className="text-xs text-textHitam font-medium">Activity Log</Text>
                            <Image source={ChevronRightIcon} style={{width:20, height:20}}/>
                        </Pressable>
                        <Pressable className="mt-4 mx-6 py-2 px-4 rounded-md border-PrimaryNormal border bg-white items-center" onPress={bottomSheet.handleBottomSheetLogoutPresent}>
                            <Text className="text-PrimaryNormal text-base font-normal">Log Out</Text>
                        </Pressable>
                    </View>
                )}
            />
             <BottomSheetModal
                ref={bottomSheet.bottomSheetLogout}
                index={1}
                snapPoints={bottomSheet.snapPoints}
                backdropComponent={bottomSheet.renderBackdrop}
                className="rounded-2xl bg-white"
            >
                <View className="items-center px-8">
                    <Pressable className="absolute right-2 top-1" onPress={bottomSheet.handleBottomSheetLogoutDismiss}>
                        <Image source={CloseIcon}/>
                    </Pressable>
                    <Text className="text-black font-semibold text-xl">Log Out</Text>
                    <Text className="text-black font-medium text-xs text-center mt-4">are you sure want to log out?</Text>
                    <View className="flex-row justify-between mt-6">
                        <Pressable
                            className="flex-1 bg-PrimaryNormal items-center py-2 rounded-md"
                            onPress={bottomSheet.handleBottomSheetLogoutDismiss}
                        >
                            <Text className="text-white text-base" >No</Text>
                        </Pressable>
                        <View style={{flex:0.5}}>

                        </View>
                        <Pressable
                            className="flex-1 bg-white items-center py-2 rounded-md"
                            onPress={bottomSheet.handleLogout}
                        >
                            <Text className="text-PrimaryNormal text-base">Yes</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheetModal>
        </View>
    )
}

export default ProfileView