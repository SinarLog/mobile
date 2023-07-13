import { FlatList, View, Text, Pressable, Image } from "react-native"
import LeaveIcon from "../../../assets/leaveIcon/leaveIcon.png"

const AnalyticsView = ({ userAnalytics, handleRequestLeave}) => {
    return (
        <View className="ml-6 mt-8">
            <FlatList 
                data={userAnalytics}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    item.id === 0 ?
                    <Pressable 
                        className="flex-row items-center justify-center bg-PrimaryNormal py-2 px-4 rounded-lg"
                        onPress={handleRequestLeave}
                    >
                        <Image source={LeaveIcon} style={{width:16,height:16, tintColor: "white"}} />
                        <View className="ml-4">
                            <Text className="text-white font-bold text-xs">Request</Text>
                            <Text className="text-white text-xs">Leave</Text>
                        </View>
                    </Pressable>
                    :
                    <View className="flex-row items-center justify-center py-2 px-4 rounded-lg border-2 border-PrimaryNormal ml-4"> 
                        <Text className="text-PrimaryNormal font-bold text-base">{item.number}</Text>
                        <View className="ml-4">
                            <Text className="text-PrimaryNormal font-bold text-xs">{item.title}</Text>
                            <Text className="text-PrimaryNormal text-xs">{item.desc}</Text>
                        </View>
                    </View>
                )}
                />
        </View>
    )
}

export default AnalyticsView