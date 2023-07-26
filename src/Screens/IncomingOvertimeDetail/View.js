import { View, Image, Text, FlatList, Pressable } from "react-native"
import CloseIcon from "../../assets/closeIcon/closeIcon.png"
import { getCurrentDateTimeAsString } from "../../utils/helper"
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet"
import IncomingOvertimeDetailModel from "./Model"
import StatusView from "../IncomingLeaveDetail/components/StatusView"

const IncomingOvertimeDetailView = ({ navigation, route }) => {
    const { isFromHistory } = route.params
    const { userData, overtimeDetail, buttonStatus, bottomSheet } = IncomingOvertimeDetailModel({ navigation, route })

    return (
        <View className="bg-backgroundHome">
            <View className="bg-white flex-row p-6 items-center justify-center">
                <Pressable className="absolute left-6" onPress={() => navigation.goBack()}>
                    <Image source={CloseIcon}/>
                </Pressable>
                <Text className="text-base text-textHitam font-bold">Overtime Submission Detail</Text>
            </View>
            <FlatList 
                data={overtimeDetail}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View className="px-6 mt-6 mb-28">
                        <View className="bg-white p-4 border rounded-lg border-textHitam mt-6">
                            <View className="flex-row items-center justify-between mb-2">
                                <Text className="text-textHitam text-xs font-semibold">Name</Text>
                                <Text className="text-textHitam text-xs font-normal">{item.fullName}</Text>
                            </View>
                            <View className="flex-row items-center justify-between my-2">
                                <Text className="text-textHitam text-xs font-semibold">Request Date</Text>
                                <Text className="text-textHitam text-xs font-normal">{item.date}</Text>
                            </View>
                            <View className="flex-row items-center justify-between my-2">
                                <Text className="text-textHitam text-xs font-semibold">Leave Duration</Text>
                                <Text className="text-textHitam text-xs font-normal">{item.duration} {item.duration > 1 ? 'Days' : 'Day'}</Text>
                            </View>
                            <View className="mt-12">
                                <Text className="text-textHitam text-xs font-semibold">Reason</Text>
                                <Text className="text-black text-xs font-normal mt-4">{item.reason}</Text>
                            </View>
                            {
                                isFromHistory ?

                                <StatusView status={item.status.toLowerCase()} name={item.fullName} timestamp={item.actionByManagerAt} reason={item.rejectionReason}/>
                                :
                                <StatusView status={buttonStatus.status} name={userData.fullName} timestamp={getCurrentDateTimeAsString()} reason={bottomSheet.reason}/>
                            }
                        </View>
                        {
                            buttonStatus.status === 'pending' && !isFromHistory ?
                            
                            <View className="flex-row mt-4">
                                <Pressable className="flex-1 bg-WarningNormal px-4 py-2 items-center rounded-lg mr-4" onPress={bottomSheet.handleRejectButton}>
                                    <Text className="text-xs font-medium text-white">Reject</Text>
                                </Pressable>
                                <Pressable className="flex-1 bg-SuccessNormal px-4 py-2 items-center rounded-lg" onPress={() => buttonStatus.setStatus('approved')}>
                                    <Text className="text-xs font-medium text-white">Approve</Text>
                                </Pressable>
                            </View>
                            :
                            null
                        }
                        {
                            isFromHistory ?

                            null
                            :
                            <View className="mt-6">
                                <Pressable className="px-4 py-2 rounded-lg items-center bg-PrimaryNormal">
                                    <Text className="text-xs font-normal text-white">Submit</Text>
                                </Pressable>
                                <Pressable className="px-4 py-2 rounded-lg items-center" onPress={() => buttonStatus.setStatus('pending')}>
                                    <Text className="text-xs font-normal text-black">Cancel</Text>
                                </Pressable>
                            </View>

                        }
                    </View>
                )}
                />
            <BottomSheetModal
                ref={bottomSheet.bottomSheetReject}
                index={2}
                snapPoints={bottomSheet.snapPoints}
                backdropComponent={bottomSheet.renderBackdrop}
                keyboardBehavior="fillParent"
                className="rounded-2xl bg-white"
            >
                <View className="items-center px-8 ">
                    <Pressable className="absolute right-2 top-1" onPress={bottomSheet.handlebottomSheetRejectDismiss}>
                        <Image source={CloseIcon}/>
                    </Pressable>
                    <Text className="text-black font-semibold text-xl">Rejected</Text>
                    <BottomSheetTextInput 
                        multiline
                        placeholder="Type your reason here!"
                        textAlignVertical="top"
                        value={bottomSheet.reason}
                        onChangeText={bottomSheet.setReason}
                        style={{
                            borderRadius:8,
                            backgroundColor: '#F3F3F3',
                            alignItems: 'flex-start',
                            height: 169,
                            alignSelf: 'stretch',
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            marginTop:22
                        }}
                    />
                    <View className="flex-row mt-6">
                        <Pressable
                            className="flex-1 bg-PrimaryNormal items-center py-2 rounded-md"
                            onPress={bottomSheet.handleRejectSubmit}
                        >
                            <Text className="text-white text-base">Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheetModal>
            
        </View>
    )
}

export default IncomingOvertimeDetailView