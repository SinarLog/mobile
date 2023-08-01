// import { SafeAreaView } from "react-native"
import AppNavigator from './src/Navigator/AppNavigator'
import { GestureHandlerRootView } from "react-native-gesture-handler" 

const App = () => {
    return (
        <GestureHandlerRootView className="flex-1 font-inter">
            <AppNavigator/>
        </GestureHandlerRootView>
    )
}

export default App