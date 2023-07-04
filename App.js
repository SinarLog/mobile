// import { SafeAreaView } from "react-native"
import AppNavigator from './src/Navigator/AppNavigator'
import { GestureHandlerRootView } from "react-native-gesture-handler" 
import LeaveRequestView from './src/Screens/LeaveRequest/View'

const App = () => {
    return (
        <GestureHandlerRootView className="flex-1 font-inter">
                {/* <AppNavigator/> */}
                <LeaveRequestView/>
        </GestureHandlerRootView>
    )
}

export default App