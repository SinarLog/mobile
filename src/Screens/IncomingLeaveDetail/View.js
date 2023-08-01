import { View, Image, Text, FlatList, Pressable } from "react-native"
import CloseIcon from "../../assets/closeIcon/closeIcon.png"
import AccordionView from "../LeaveDetail/components/AccordionView"
import { getCurrentDateTimeAsString, getInitials } from "../../utils/helper"
import StatusView from "./components/StatusView"
import StatusViewFromHistory from "../LeaveDetail/components/StatusView"
import IncomingLeaveDetailModel from "./Model"
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet"

const IncomingLeaveDetailView = ({ navigation, route }) => {
    const { isFromHistory } = route.params
    const { userData, leaveDetail, buttonStatus, bottomSheet, handleSubmitButton, handleDetailChild } = IncomingLeaveDetailModel({ navigation, route })

    return (
        <View className="bg-backgroundHome">
            <View className="bg-white flex-row p-6 items-center justify-center">
                <Pressable className="absolute left-6" onPress={() => navigation.goBack()}>
                    <Image source={CloseIcon}/>
                </Pressable>
                <Text className="text-base text-textHitam font-bold">Leave Proposal Detail</Text>
            </View>
            <FlatList 
                data={leaveDetail}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View className="px-6 mt-6 mb-28">
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
                        <View className="bg-white p-4 border rounded-lg border-textHitam mt-6">
                            <View className="flex-row items-center justify-between mb-2">
                                <Text className="text-textHitam text-xs font-semibold">Name</Text>
                                <Text className="text-textHitam text-xs font-normal">{item.fullName}</Text>
                            </View>
                            <View className="flex-row items-center justify-between my-2">
                                <Text className="text-textHitam text-xs font-semibold">Request Date</Text>
                                <Text className="text-textHitam text-xs font-normal">{item.requestDate}</Text>
                            </View>
                            <View className="flex-row items-center justify-between my-2">
                                <Text className="text-textHitam text-xs font-semibold">Start Date</Text>
                                <Text className="text-textHitam text-xs font-normal">{item.from}</Text>
                            </View>
                            <View className="flex-row items-center justify-between my-2">
                                <Text className="text-textHitam text-xs font-semibold">End Date</Text>
                                <Text className="text-textHitam text-xs font-normal">{item.to}</Text>
                            </View>
                            <View className="flex-row items-center justify-between my-2">
                                <Text className="text-textHitam text-xs font-semibold">Leave Duration</Text>
                                <Text className="text-textHitam text-xs font-normal">{item.duration} {item.duration > 1 ? 'Days' : 'Day'}</Text>
                            </View>
                            <View className="flex-row items-center justify-between my-2">
                                <Text className="text-textHitam text-xs font-semibold">Leave Type</Text>
                                <Text className="text-textHitam text-xs font-normal capitalize">{item.type}</Text>
                            </View>
                            <View className="flex-row items-center justify-between mt-2">
                                <Text className="text-textHitam text-xs font-semibold">Attachment</Text>
                                <Pressable disabled={!item.attachment}>
                                    <Text className="text-textHitam text-xs font-normal">{item.attachment ? 'Link attachment' : 'No Attachment'}</Text>
                                </Pressable>
                            </View>
                            <View className="mt-12">
                                <Text className="text-textHitam text-xs font-semibold">Reason</Text>
                                <Text className="text-black text-xs font-normal mt-4">{item.reason}</Text>
                            </View>
                            {
                                isFromHistory ?
                                <StatusViewFromHistory status={item.view} top={12} nameHR={item.hr ? item.hr.fullName : null} nameManager={item.manager ? item.manager.fullName : null} timestampHR={item.actionByHrAt ? item.actionByHrAt : null} timestampManager={item.actionByManagerAt ? item.actionByManagerAt : null} reason={item.rejectionReason ? item.rejectionReason : null}/>
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
                            item.parent ? 
                            <>
                            <AccordionView title={'Associated Leave'}>
                                <View className="flex-row items-center justify-between my-2">
                                    <Text className="text-textHitam text-xs font-semibold">Start Date</Text>
                                    <Text className="text-textHitam text-xs font-normal">{item.parent.from}</Text>
                                </View>
                                <View className="flex-row items-center justify-between my-2">
                                    <Text className="text-textHitam text-xs font-semibold">End Date</Text>
                                    <Text className="text-textHitam text-xs font-normal">{item.parent.to}</Text>
                                </View>
                                <View className="flex-row items-center justify-between mt-2">
                                    <Text className="text-textHitam text-xs font-semibold">Leave Type</Text>
                                    <Text className="text-textHitam text-xs font-normal capitalize">{item.parent.type}</Text>
                                </View>
                                {
                                    isFromHistory ?

                                    null
                                    :
                                    <StatusView status={buttonStatus.statusParent} name={userData.fullName} timestamp={getCurrentDateTimeAsString()} reason={bottomSheet.reasonParent}/>
                                }
                            </AccordionView>
                            {
                                buttonStatus.statusParent === 'pending' && !isFromHistory ?
                                
                                <View className="flex-row mt-4">
                                    <Pressable className="flex-1 bg-WarningNormal px-4 py-2 items-center rounded-lg mr-4" onPress={bottomSheet.handleRejectParentButton}>
                                        <Text className="text-xs font-medium text-white">Reject</Text>
                                    </Pressable>
                                    <Pressable className="flex-1 bg-SuccessNormal px-4 py-2 items-center rounded-lg" onPress={() => buttonStatus.setStatusParent('approve')}>
                                        <Text className="text-xs font-medium text-white">Approve</Text>
                                    </Pressable>
                                </View>
                                :
                                null
                            }
                            </>
                            : null
                        }
                        {
                            item.childs ?
                            <FlatList
                                data={item.childs}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (

                                <AccordionView title={'Leave Overflow'}>
                                    <View className="flex-row items-center justify-between my-2">
                                        <Text className="text-textHitam text-xs font-semibold">Start Date</Text>
                                        <Text className="text-textHitam text-xs font-normal">{item.from}</Text>
                                    </View>
                                    <View className="flex-row items-center justify-between my-2">
                                        <Text className="text-textHitam text-xs font-semibold">End Date</Text>
                                        <Text className="text-textHitam text-xs font-normal">{item.to}</Text>
                                    </View>
                                    <View className="flex-row items-center justify-between my-2">
                                        <Text className="text-textHitam text-xs font-semibold">Leave type</Text>
                                        <Text className="text-textHitam text-xs font-normal capitalize">{item.type}</Text>
                                    </View>
                                    <View className="flex-row items-center justify-between my-2">
                                        <Text className="text-textHitam text-xs font-semibold">Status</Text>
                                        <Text className="text-textHitam text-xs font-normal capitalize">{item.status}</Text>
                                    </View>
                                    <Pressable className="bg-SecondaryNormal mt-4 py-1 items-center" style={{borderRadius:6}} onPress={() => handleDetailChild(item.id)}>
                                        <Text className="text-white font-normal text-xs" >Detail</Text>
                                    </Pressable>
                                </AccordionView>
                                )}
                            />
                            : null
                        }
                        {
                            isFromHistory ?

                            null
                            :
                            <View className="mt-6">
                                <Pressable 
                                    className={`px-4 py-2 rounded-lg items-center ${ buttonStatus.status === 'pending' ? 'bg-InactiveNormal' : item.parent ? buttonStatus.statusParent === 'pending' ? 'bg-InactiveNormal' : 'bg-PrimaryNormal' : 'bg-PrimaryNormal'}`} 
                                    onPress={() => handleSubmitButton()}
                                    disabled={buttonStatus.status === 'pending' || ( item.parent && buttonStatus.statusParent === 'pending')}
                                >
                                    <Text className={`text-xs font-normal ${ buttonStatus.status === 'pending' ? 'text-InactiveDarker' : item.parent ? buttonStatus.statusParent === 'pending' ? 'text-InactiveDarker' : 'text-whitel' : 'text-white'}`}>Submit</Text>
                                </Pressable>
                                <Pressable 
                                    className="px-4 py-2 rounded-lg items-center" 
                                    onPress={() => {
                                        buttonStatus.setStatus('pending')
                                        buttonStatus.setStatusParent('pending')
                                    }}
                                >
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
                            marginTop:22,
                            color: "black"
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
            <BottomSheetModal
                ref={bottomSheet.bottomSheetRejectParent}
                index={2}
                snapPoints={bottomSheet.snapPoints}
                backdropComponent={bottomSheet.renderBackdrop}
                keyboardBehavior="fillParent"
                className="rounded-2xl bg-white"
            >
                <View className="items-center px-8 ">
                    <Pressable className="absolute right-2 top-1" onPress={bottomSheet.handlebottomSheetRejectParentDismiss}>
                        <Image source={CloseIcon}/>
                    </Pressable>
                    <Text className="text-black font-semibold text-xl">Rejected</Text>
                    <BottomSheetTextInput 
                        multiline
                        placeholder="Type your reason here!"
                        textAlignVertical="top"
                        value={bottomSheet.reasonParent}
                        onChangeText={bottomSheet.setReasonParent}
                        style={{
                            borderRadius:8,
                            backgroundColor: '#F3F3F3',
                            alignItems: 'flex-start',
                            height: 169,
                            alignSelf: 'stretch',
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            marginTop:22,
                            color: "black"
                        }}
                    />
                    <View className="flex-row mt-6">
                        <Pressable
                            className="flex-1 bg-PrimaryNormal items-center py-2 rounded-md"
                            onPress={bottomSheet.handleRejectParentSubmit}
                        >
                            <Text className="text-white text-base">Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheetModal>
        </View>
    )
}

export default IncomingLeaveDetailView