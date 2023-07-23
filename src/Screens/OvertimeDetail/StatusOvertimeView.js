import { View, Text } from "react-native"

const StatusOvertimeView = ({ status, name, timeStamp, reason }) => {
    if (status === 'PENDING') {
        return (
            <View className={`mt-12`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View style={{borderWidth:0.15, backgroundColor:'#F3F3F3'}}></View>
                <View className="flex-row items-center mt-4">
                    <View className="bg-InactiveDark h-3 w-3 rounded-full mr-3"></View>
                    <Text className="text-InactiveDarkActive font-semibold" style={{fontSize:10}}>Pending</Text>
                    <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                    <Text className="font-normal text-textHitam" style={{fontSize:10}}>{name} - Manager</Text>
                </View>
            </View> 
        )
    } else if (status === 'REJECTED') {
        return (
            <View className={`mt-12`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View style={{borderWidth:0.15, backgroundColor:'#F3F3F3'}}></View>
                <View className="flex-row mt-4">
                    <View className="bg-PrimaryNormal h-3 w-3 rounded-full mr-3"></View>
                    <View>
                        <View className="flex-row items-center">
                            <Text className="text-PrimaryNormal font-semibold" style={{fontSize:10}}>Rejected</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                            <Text className="font-normal text-textHitam" style={{fontSize:10}}>{name} - Manager</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                        </View>
                        <Text className="font-normal text-textHitam" style={{fontSize:10}}>{timeStamp}</Text>
                        <Text className="text-textHitam font-semibold mt-2" style={{fontSize:10}}>Reason Rejected</Text>
                        <Text className="font-normal text-black" style={{fontSize:10}}>{reason}</Text>
                    </View>
                </View>
            </View>
        )
    } else if (status === 'APPROVED') {
        return (
            <View className={`mt-12`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View style={{borderWidth:0.15, backgroundColor:'#F3F3F3'}}></View>
                <View className="flex-row items-center mt-4">
                    <View className="bg-SuccessNormal h-3 w-3 rounded-full mr-3"></View>
                    <View>
                        <View className="flex-row items-center">
                            <Text className="text-SuccessNormal font-semibold" style={{fontSize:10}}>Approved</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                            <Text className="font-normal text-textHitam break-all" style={{fontSize:10}}>{name} - Manager</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                        </View>
                        <Text className="font-normal text-textHitam break-all" style={{fontSize:10}}>{timeStamp}</Text>
                    </View>
                </View>
            </View> 
        )
    } else {
        return (
            <View className={`mt-12`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View style={{borderWidth:0.15, backgroundColor:'#F3F3F3'}}></View>
                <View className="flex-row items-center mt-4">
                    <View className="bg-WarningNormal h-3 w-3 rounded-full mr-3"></View>
                    <Text className="text-WarningNormal font-semibold" style={{fontSize:10}}>Closed</Text>
                    <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                    <Text className="font-normal text-textHitam" style={{fontSize:10}}>{timeStamp}</Text>
                </View>
            </View>
        )
    }
}

export default StatusOvertimeView