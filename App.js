// import { SafeAreaView } from "react-native"
import AppNavigator from './src/Navigator/AppNavigator'
import { GestureHandlerRootView } from "react-native-gesture-handler" 
import IncomingLeaveDetailView from './src/Screens/IncomingLeaveDetail/View'
import ProposalView from './src/Screens/Proposal/View'
import IncomingOvertimeDetailView from './src/Screens/IncomingOvertimeDetail/View'

const App = () => {
    return (
        <GestureHandlerRootView className="flex-1 font-inter">
            <AppNavigator/>
            {/* <IncomingLeaveDetailView/> */}
            {/* <ProposalView/> */}
            {/* <IncomingOvertimeDetailView/> */}
        </GestureHandlerRootView>
    )
}

export default App