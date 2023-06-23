import { SafeAreaView } from "react-native"
import AppNavigator from './src/Navigator/AppNavigator'
import OTPview from "./src/Screens/OTP/View"

const App = () => {
    return (
        <SafeAreaView className="flex-1 font-inter">
            <AppNavigator/>
            {/* <OTPview/> */}
        </SafeAreaView>
    )
}

export default App