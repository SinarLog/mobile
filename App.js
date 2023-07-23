// import { SafeAreaView } from "react-native"
import AppNavigator from './src/Navigator/AppNavigator'
import { GestureHandlerRootView } from "react-native-gesture-handler" 
import OvertimeDetailView from './src/Screens/OvertimeDetail/View'

const App = () => {
    return (
        <GestureHandlerRootView className="flex-1 font-inter">
            <AppNavigator/>
            {/* <OvertimeDetailView/> */}
        </GestureHandlerRootView>
    )
}

export default App