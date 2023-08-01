import { FlatList, Image, Pressable, Text, View } from "react-native"
import NoDataIcon from "../../../assets/noDataIcon/noDataIcon.png"
import { hexToRgbA } from "../../../utils/helper"

const OvertimeView = ({ overtimeSubmissions, handleDetailOvertime, handleViewAll }) => {
    return (
        <View>
            <View className="flex-row items-center justify-between mx-6 mt-8">
                <Text className="text-textHitam text-base">My Overtime Submissions</Text>
                {
                    overtimeSubmissions.length > 0 ?
                    <Pressable className="flex-row items-center" onPress={handleViewAll}>
                        <Text className="text-PrimaryNormal text-xs ml-4">View all</Text>
                    </Pressable>
                    :
                    null
                }
            </View>
            <View className="mx-6 mt-4">
                <FlatList 
                    data={overtimeSubmissions}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Pressable className="bg-white mb-2 rounded" onPress={() => handleDetailOvertime(item.id)}> 
                            <View className="flex-row py-2 px-2">
                                <Text className="text-black text-xs">{item.requestDate}</Text>
                            </View>
                            <View className="flex-row justify-between py-2 px-2">
                                <View className="flex-row items-center">
                                        <Text className="text-black text-xs">{item.duration}</Text>
                                    </View>
                                <View className="py-1 px-2 rounded-full" style={{backgroundColor: hexToRgbA(item.color, 0.25)}}>
                                    <Text className='capitalize' style={{color: item.color, fontSize:12}}>{item.status}</Text>
                                </View>
                            </View>
                        </Pressable>
                    )}
                    ListEmptyComponent={ () => (
                        <View className="bg-white py-4 items-center justify-center rounded">
                            <Image source={NoDataIcon}/>
                            <Text className="text-textHitam text-xs font-semibold">Opps, you dont have overtime submissions</Text>
                        </View>
                    )}
                    />
            </View>
        </View>
    )
}

export default OvertimeView