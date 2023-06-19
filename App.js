import { SafeAreaView } from "react-native"
import AppNavigator from './src/Navigator/AppNavigator'

const App = () => {
    return (
        <SafeAreaView className="flex-1 font-inter">
            <AppNavigator/>
        </SafeAreaView>
    )
}

export default App