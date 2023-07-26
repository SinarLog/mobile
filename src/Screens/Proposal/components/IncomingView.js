import { View, Text, Pressable } from "react-native"
import LeaveView from "./LeaveView"
import OvertimeView from "./OvertimeView"

const IncomingView = ({ incoming, navigation }) => {

    return (
        <View>
            <View className="flex-row justify-around mx-6 mt-8">
                <Pressable className={`flex-1 ${incoming.incomingTabView === 'Leave' ? 'border-b-PrimaryNormal border-b-2' : ''} items-center pb-2`} onPress={() => incoming.setIncomingTabView('Leave')}>
                    <Text className={`text-xs ${incoming.incomingTabView ==='Leave' ? 'text-PrimaryNormal' : 'text-textHitam'} font-normal`}>Leave</Text>
                </Pressable>
                <Pressable className={`flex-1 ${incoming.incomingTabView === 'Overtime' ? 'border-b-PrimaryNormal border-b-2' : ''} items-center pb-2`} onPress={() => incoming.setIncomingTabView('Overtime')}>
                    <Text className={`text-xs ${incoming.incomingTabView ==='Overtime' ? 'text-PrimaryNormal' : 'text-textHitam'} font-normal`}>Overtime</Text>
                </Pressable>
            </View>
            {
                incoming.incomingTabView === 'Leave' ?

                <LeaveView isFromHistory={false} navigation={navigation}/>
                : 
                <OvertimeView navigation={navigation}/>
            }

        </View>
    )
}

export default IncomingView