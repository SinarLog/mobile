import { FlatList, Pressable, Text, View, Image } from "react-native"
import { getInitials } from "../../../utils/helper"
import NoDataIcon from "../../../assets/noDataIcon/noDataIcon.png"

const TakingLeaveView = ({ takingLeaves, handleViewAll }) => {
    return (
        <View>
            <View className="flex-row items-center justify-between mx-6 mt-8">
                <Text className="text-textHitam text-base">Who's Taking Leave</Text>
                {
                    takingLeaves.length > 0 ?
                    <Pressable className="flex-row items-center" onPress={handleViewAll}>
                        <Text className="text-PrimaryNormal text-xs ml-4">View all</Text>
                    </Pressable>
                    :
                    null
                }
            </View>
            <View className="mx-6 mt-4">
                <FlatList 
                    data={takingLeaves}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Pressable className="bg-white mb-2 rounded"> 
                            <View className="flex-row items-center py-2 justify-between px-4">
                                <View className="flex-row items-center">
                                    {
                                        item.avatar ? 
                                        <Image source={{uri: item.avatar}} style={{width: 24, height: 24, borderRadius: 12, marginRight: 8}}/>
                                        :
                                        <View className='w-6 h-6 rounded-full bg-white mr-2 items-center justify-center border'>
                                            <Text className="text-black" style={{fontSize:12}}>{getInitials(item.fullName)}</Text>
                                        </View>
                                    }
                                    <Text className="text-black text-xs">{item.fullName}</Text>
                                </View>
                                <Text className="text-black text-xs capitalize">{item.type}</Text>
                            </View>
                            <View className="h-0 bg-InactiveNormal mx-4" style={{borderWidth:0.125}}></View>
                            <View className="items-end px-4 py-2">
                                <View className="flex-row">
                                    <Text className="text-black text-xs">{item.from}</Text>
                                    <Text className="text-black text-xs ml-4">{item.to}</Text>
                                </View>
                            </View>
                        </Pressable>
                    )}
                    ListEmptyComponent={ () => (
                        <View className="bg-white py-4 items-center justify-center rounded">
                            <Image source={NoDataIcon}/>
                            <Text className="text-textHitam text-xs font-semibold">There is no one on Leave this month</Text>
                        </View>
                    )}
                    />
            </View>
        </View>
    )
}

export default TakingLeaveView