import { FlatList, Image, Pressable, Text, View } from "react-native"
import SliderIcon from "../../../assets/sliderIcon/sliderIcon.png"
import NoDataIcon from "../../../assets/noDataIcon/noDataIcon.png"

const OvertimeView = ({ overtimeSubmissions, handleDetailOvertime }) => {
    return (
        <View>
            <View className="flex-row items-center justify-between mx-6 mt-8">
                <Text className="text-textHitam text-base">My Overtime Submissions</Text>
                <View className="flex-row items-center">
                    <Image source={SliderIcon} />
                    <Text className="text-PrimaryNormal text-xs ml-4">View all</Text>
                </View>
            </View>
            <View className="mx-6 mt-4">
                <FlatList 
                    data={overtimeSubmissions}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Pressable className="flex-row justify-between bg-white mb-2 rounded" onPress={() => handleDetailOvertime(item.id)}> 
                            <View className="flex-row">
                                <View className='w-2 rounded-md' style={{backgroundColor: item.color}}>
                                </View>
                                <View className="py-2 px-2">
                                    <Text className="text-black text-xs">{item.requestDate}</Text>
                                </View>
                            </View>
                            <View className="py-2 pr-2">
                                <Text className="text-black text-xs">{item.duration}</Text>
                                <Text className='text-xs mt-2' style={{color: item.color}}>{item.status}</Text>
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