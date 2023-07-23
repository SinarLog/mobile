import { View, Image, Text, FlatList, Pressable } from "react-native"
import ChevronCloseIcon from "../../assets/chevronCloseIcon/chevronCloseIcon.png"
import StatusView from "./components/StatusView"
import AccordionView from "./components/AccordionView"
import LeaveDetailModel from "./Model"

const LeaveDetailView = ({ navigation, route }) => {
    const { leaveDetail, handleBackButton, handleLinkAttachment, handleDetailChild } = LeaveDetailModel({ navigation, route })
    const data = [{id: 0}]

    return (
        <View className="bg-backgroundHome">
            <View className="bg-white flex-row p-6 items-center justify-center">
                <Pressable className="absolute left-6" onPress={handleBackButton}>
                    <Image source={ChevronCloseIcon}/>
                </Pressable>
                <Text className="text-base text-textHitam font-bold">My Leave Request Detail</Text>
            </View>
            <FlatList 
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View className="px-6 mt-6 mb-28">
                        <View className="bg-white p-4">
                            <View className="flex-row items-center justify-between mb-2">
                                <Text className="text-textHitam text-xs font-semibold">Request Date</Text>
                                <Text className="text-textHitam text-xs font-normal">{leaveDetail.requestDate}</Text>
                            </View>
                            <View className="flex-row items-center justify-between my-2">
                                <Text className="text-textHitam text-xs font-semibold">Start Date</Text>
                                <Text className="text-textHitam text-xs font-normal">{leaveDetail.from}</Text>
                            </View>
                            <View className="flex-row items-center justify-between my-2">
                                <Text className="text-textHitam text-xs font-semibold">End Date</Text>
                                <Text className="text-textHitam text-xs font-normal">{leaveDetail.to}</Text>
                            </View>
                            <View className="flex-row items-center justify-between my-2">
                                <Text className="text-textHitam text-xs font-semibold">Leave Duration</Text>
                                <Text className="text-textHitam text-xs font-normal">duration</Text>
                            </View>
                            <View className="flex-row items-center justify-between my-2">
                                <Text className="text-textHitam text-xs font-semibold">Leave Type</Text>
                                <Text className="text-textHitam text-xs font-normal">{leaveDetail.type}</Text>
                            </View>
                            <View className="flex-row items-center justify-between mt-2">
                                <Text className="text-textHitam text-xs font-semibold">Attachment</Text>
                                <Pressable onPress={handleLinkAttachment} disabled={!leaveDetail.attachmentUrl}>
                                    <Text className="text-textHitam text-xs font-normal">{leaveDetail.attachmentUrl ? 'Link attachment' : 'No Attachment'}</Text>
                                </Pressable>
                            </View>
                            <View className="mt-12">
                                <Text className="text-textHitam text-xs font-semibold">Reason</Text>
                                <Text className="text-black text-xs font-normal mt-4">{leaveDetail.reason}</Text>
                            </View>
                            <StatusView status={leaveDetail.view} top={12} nameHR={leaveDetail.hr ? leaveDetail.hr.fullName : null} nameManager={leaveDetail.manager ? leaveDetail.manager.fullName : null} timestampHR={leaveDetail.actionByHrAt ? leaveDetail.actionByHrAt : null} timestampManager={leaveDetail.actionByManagerAt ? leaveDetail.actionByManagerAt : null} reason={leaveDetail.rejectionReason ? leaveDetail.rejectionReason : null}/>
                        </View>
                        {
                            leaveDetail.parent ? 

                            <AccordionView title={'Associated Leave'}>
                                <View className="flex-row items-center justify-between my-2">
                                    <Text className="text-textHitam text-xs font-semibold">Start Date</Text>
                                    <Text className="text-textHitam text-xs font-normal">{leaveDetail.parent.from}</Text>
                                </View>
                                <View className="flex-row items-center justify-between my-2">
                                    <Text className="text-textHitam text-xs font-semibold">End Date</Text>
                                    <Text className="text-textHitam text-xs font-normal">{leaveDetail.parent.to}</Text>
                                </View>
                                <View className="flex-row items-center justify-between mt-2">
                                    <Text className="text-textHitam text-xs font-semibold">Leave Type</Text>
                                    <Text className="text-textHitam text-xs font-normal capitalize">{leaveDetail.parent.type}</Text>
                                </View>
                            </AccordionView>
                            : null
                        }
                        {
                            leaveDetail.childs ?
                            <FlatList
                                data={leaveDetail.childs}
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
                                    <Pressable className="bg-SecondaryNormal mt-4 py-1 items-center" style={{borderRadius:6}} onPress={() => handleDetailChild(item.id)}>
                                        <Text className="text-white font-normal text-xs" >Detail</Text>
                                    </Pressable>
                                </AccordionView>
                                )}
                            />
                            : null
                        }
                    </View>
                )}
            />
        </View>
    )
}

export default LeaveDetailView