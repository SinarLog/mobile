import { View, Text } from "react-native"

const StatusView = ({ status, top, nameHR, nameManager, timestampHR, timestampManager, reason }) => {
    if ( status === 'pending') {
        return (
            <View className={`mt-${top}`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View className="flex-row items-center mt-4">
                    <View className="bg-InactiveDark h-3 w-3 rounded-full mr-3"></View>
                    <Text className="text-InactiveDarkActive font-semibold" style={{fontSize:10}}>Pending</Text>
                    <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                    <Text className="font-normal text-textHitam" style={{fontSize:10}}>{nameManager ? nameManager : nameHR} - {nameManager ? 'Manager' : 'HR'}</Text>
                </View>
            </View> 
        )
    } else if ( status === 'closed') {
        return (
            <View className={`mt-${top}`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View className="flex-row items-center mt-4">
                    <View className="bg-WarningNormal h-3 w-3 rounded-full mr-3"></View>
                    <Text className="text-WarningNormal font-semibold" style={{fontSize:10}}>Closed</Text>
                    <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                    <Text className="font-normal text-textHitam" style={{fontSize:10}}>System</Text>
                </View>
            </View>
        )
    } else if ( status == 'rejected') {
        return (
            <View className={`mt-${top}`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View className="flex-row mt-4">
                    <View className="bg-PrimaryNormal h-3 w-3 rounded-full mr-3"></View>
                    <View>
                        <View className="flex-row items-center">
                            <Text className="text-PrimaryNormal font-semibold" style={{fontSize:10}}>Rejected</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                            <Text className="font-normal text-textHitam" style={{fontSize:10}}>{nameManager ? nameManager : nameHR} - {nameManager ? 'Manager' : 'HR'}</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                        </View>
                        <Text className="font-normal text-textHitam" style={{fontSize:10}}>{timestampManager ? timestampManager : timestampHR}</Text>
                        <Text className="text-textHitam font-semibold mt-2" style={{fontSize:10}}>Reason Rejected</Text>
                        <Text className="font-normal text-black" style={{fontSize:10}}>{reason}</Text>
                    </View>
                </View>
            </View>
        )
    } else if (status === 'approved') {
        return (
            <View className={`mt-${top}`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View className="flex-row items-center mt-4">
                    <View className="bg-SuccessNormal h-3 w-3 rounded-full mr-3"></View>
                    <View>
                        <View className="flex-row items-center">
                            <Text className="text-SuccessNormal font-semibold" style={{fontSize:10}}>Approved</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                            <Text className="font-normal text-textHitam break-all" style={{fontSize:10}}>{nameHR} - HR</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                        </View>
                        <Text className="font-normal text-textHitam break-all" style={{fontSize:10}}>{timestampHR}</Text>
                    </View>
                </View>
            </View> 
        )
    } 
    else if ( status == 'approvedManager') {
        return (
            <View className={`mt-${top}`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View className="flex-row items-start mt-4">
                    <View className="items-center mr-3">
                        <View className="bg-SuccessNormal h-3 w-3 rounded-full"></View>
                        <View className="bg-SuccessNormal mt-1" style={{width:1, height:30}}></View>
                    </View>
                    <View>
                        <View className="flex-row items-center">
                            <Text className="text-SuccessNormal font-semibold" style={{fontSize:10}}>Approved</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                            <Text className="font-normal text-textHitam" style={{fontSize:10}}>{nameManager ? nameManager : nameHR} - {nameManager ? 'Manager' : 'HR'}</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                        </View>
                        <Text className="font-normal text-textHitam" style={{fontSize:10}}>{timestampManager ? timestampManager : timestampHR}</Text>
                    </View>
                </View>
                <View className="flex-row items-center mt-1">
                    <View className="bg-InactiveDark h-3 w-3 rounded-full mr-3"></View>
                    <Text className="text-InactiveDarkActive font-semibold" style={{fontSize:10}}>Pending</Text>
                    <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                    <Text className="font-normal text-textHitam" style={{fontSize:10}}>HR</Text>
                </View>
            </View> 
        )
    } else if ( status === "approveClosed") {
        return (
            <View className={`mt-${top}`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View className="flex-row items-start mt-4">
                    <View className="items-center mr-3">
                        <View className="bg-SuccessNormal h-3 w-3 rounded-full"></View>
                        <View className="bg-SuccessNormal mt-1" style={{width:1, height:30}}></View>
                    </View>
                    <View>
                        <View className="flex-row items-center">
                            <Text className="text-SuccessNormal font-semibold" style={{fontSize:10}}>Approved</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                            <Text className="font-normal text-textHitam" style={{fontSize:10}}>{nameManager ? nameManager : nameHR} - {nameManager ? 'Manager' : 'HR'}</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                        </View>
                        <Text className="font-normal text-textHitam" style={{fontSize:10}}>{timestampManager ? timestampManager : timestampHR}</Text>
                    </View>
                </View>
                <View className="flex-row items-center mt-1">
                    <View className="bg-WarningNormal h-3 w-3 rounded-full mr-3"></View>
                    <Text className="text-WarningNormal font-semibold" style={{fontSize:10}}>Closed</Text>
                    <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                    <Text className="font-normal text-textHitam" style={{fontSize:10}}>System</Text>
                </View>
            </View> 
        )
    } 
    else if ( status === "approvedHR") {
        return (
            <View className={`mt-${top}`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View className="flex-row items-start mt-4">
                    <View className="items-center mr-3">
                        <View className="bg-SuccessNormal h-3 w-3 rounded-full"></View>
                        <View className="bg-SuccessNormal mt-1" style={{width:1, height:30}}></View>
                    </View>
                    <View>
                        <View className="flex-row items-center">
                            <Text className="text-SuccessNormal font-semibold" style={{fontSize:10}}>Approved</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                            <Text className="font-normal text-textHitam" style={{fontSize:10}}>{nameManager} - Manager</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                        </View>
                        <Text className="font-normal text-textHitam" style={{fontSize:10}}>{timestampManager}</Text>
                    </View>
                </View>
                <View className="flex-row item-center mt-1">
                    <View className="bg-SuccessNormal h-3 w-3 rounded-full mr-3"></View>
                    <View>
                        <View className="flex-row items-center">
                            <Text className="text-SuccessNormal font-semibold" style={{fontSize:10}}>Approved</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                            <Text className="font-normal text-textHitam" style={{fontSize:10}}>{nameHR} - HR</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                        </View>
                        <Text className="font-normal text-textHitam" style={{fontSize:10}}>{timestampHR}</Text>
                    </View>
                </View>
            </View> 
        )
    } else if ( status === "rejectedHR") {
        return (
            <View className={`mt-${top}`}>
                <Text className="text-textHitam text-xs font-normal">Status</Text>
                <View className="flex-row items-start mt-4">
                    <View className="items-center mr-3">
                        <View className="bg-SuccessNormal h-3 w-3 rounded-full"></View>
                        <View className="bg-SuccessNormal mt-1" style={{width:1, height:30}}></View>
                    </View>
                    <View>
                        <View className="flex-row items-center">
                            <Text className="text-SuccessNormal font-semibold" style={{fontSize:10}}>Approved</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                            <Text className="font-normal text-textHitam" style={{fontSize:10}}>{nameManager} - Manager</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                        </View>
                        <Text className="font-normal text-textHitam" style={{fontSize:10}}>{timestampManager}</Text>
                    </View>
                </View>
                <View className="flex-row mt-1">
                    <View className="bg-PrimaryNormal h-3 w-3 rounded-full mr-3"></View>
                    <View>
                        <View className="flex-row items-center">
                            <Text className="text-PrimaryNormal font-semibold" style={{fontSize:10}}>Rejected</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                            <Text className="font-normal text-textHitam" style={{fontSize:10}}>{nameHR} - HR</Text>
                            <View className="bg-textHitam h-1 w-1 rounded-sm mx-1"></View>
                        </View>
                        <Text className="font-normal text-textHitam" style={{fontSize:10}}>{timestampHR}</Text>
                        <Text className="text-textHitam font-semibold mt-2" style={{fontSize:10}}>Reason Rejected</Text>
                        <Text className="font-normal text-black" style={{fontSize:10}}>{reason}</Text>
                    </View>
                </View>
            </View> 
        )
    }
}

export default StatusView