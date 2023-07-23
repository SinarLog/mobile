import { View, Image, Text, FlatList, Pressable } from "react-native"
import ChevronCloseIcon  from "../../assets/chevronCloseIcon/chevronCloseIcon.png"
import OvertimeDetailModel from "./Model"
import StatusOvertimeView from "./StatusOvertimeView"

const OvertimeDetailView = ({ navigation, route }) => {
    const { overtimeDetail, handleBackButton } = OvertimeDetailModel({ navigation, route })
    const data = [{id:0}]
    return (
        <View className="bg-backgroundHome">
            <View className="bg-white flex-row p-6 items-center justify-center">
                <Pressable className="absolute left-6" onPress={handleBackButton}>
                    <Image source={ChevronCloseIcon}/>
                </Pressable>
                <Text className="text-base text-textHitam font-bold">My Overtime Submission Detail</Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                className="px-6 mt-6"
                renderItem={({ item }) => (
                    <View className="bg-white px-4 py-4">
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-textHitam text-xs font-semibold">Overtime Date</Text>
                            <Text className="text-textHitam text-xs font-normal">{overtimeDetail.date}</Text>
                        </View>
                        <View style={{borderWidth:0.15, backgroundColor:'#F3F3F3'}}></View>
                        <View className="flex-row justify-between mt-2">
                            <Text className="text-textHitam text-xs font-semibold">Overtime Duration</Text>
                            <Text className="text-textHitam text-xs font-normal">{overtimeDetail.duration}</Text>
                        </View>
                        <View className="mt-12">
                            <Text className="text-textHitam text-xs font-semibold mb-2">Reason</Text>
                            <View style={{borderWidth:0.15, backgroundColor:'#F3F3F3'}}></View>
                            <Text className="text-textHitam text-xs font-normal mt-2">{overtimeDetail.reason}</Text>
                        </View>
                        <StatusOvertimeView status={overtimeDetail.status} name={overtimeDetail.manager ? overtimeDetail.manager.fullName : null} timeStamp={overtimeDetail.actionByManagerAt} reason={overtimeDetail.rejectionReason}/>
                    </View>
                )}
            />
        </View>
    )
}

export default OvertimeDetailView