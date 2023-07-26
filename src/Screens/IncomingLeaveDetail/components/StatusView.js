import { View, Text } from "react-native"

const StatusView = ({ status, name, timestamp, reason }) => {
    if ( status === 'pending') {
        return (
            <View className={`mt-4`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View className="flex-row items-center mt-4">
                    <View className="bg-InactiveDark h-3 w-3 rounded-full mr-3"></View>
                    <Text className="text-InactiveDarkActive font-semibold text-xs" >Pending</Text>
                    <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                    <Text className="font-normal text-textHitam text-xs" >{name} - Manager</Text>
                </View>
            </View> 
        )
    } else if ( status == 'rejected') {
        return (
            <View className={`mt-4`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View className="flex-row mt-4">
                    <View className="bg-PrimaryNormal h-3 w-3 rounded-full mr-3"></View>
                    <View>
                        <View className="flex-row items-center">
                            <Text className="text-PrimaryNormal font-semibold text-xs" >Rejected</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                            <Text className="font-normal text-textHitam text-xs" >{name} - Manager</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                        </View>
                        <Text className="font-normal text-textHitam text-xs" >{timestamp}</Text>
                        <Text className="text-textHitam font-semibold mt-2 text-xs" >Reason Rejected</Text>
                        <Text className="font-normal text-black text-xs" >{reason}</Text>
                    </View>
                </View>
            </View>
        )
    } else if (status === 'approved') {
        return (
            <View className={`mt-4`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View className="flex-row mt-4">
                    <View className="bg-SuccessNormal h-3 w-3 rounded-full mr-3"></View>
                    <View>
                        <View className="flex-row items-center">
                            <Text className="text-SuccessNormal font-semibold text-xs" >Approved</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                            <Text className="font-normal text-textHitam break-all text-xs" >{name} - Manager</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                        </View>
                        <Text className="font-normal text-textHitam break-all text-xs" >{timestamp}</Text>
                    </View>
                </View>
            </View> 
        )
    } 
}

export default StatusView