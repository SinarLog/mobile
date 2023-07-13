import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import PATH from "./PathNavigation"
import SplashView from "../Screens/Splash/View"
import OnBoardingView from "../Screens/OnBoarding/View"
import LoginView from "../Screens/Login/View"
import HomeView from "../Screens/Home/View"
import OTPview from "../Screens/OTP/View"
import LeaveRequestView from "../Screens/LeaveRequest/View"
import LeaveDetailView from "../Screens/LeaveDetail/View"

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={PATH.Splash} screenOptions={{headerShown: false}}>
                <Stack.Screen name={PATH.Splash} component={SplashView}/>
                <Stack.Screen name={PATH.OnBoarding} component={OnBoardingView}/>
                <Stack.Screen name={PATH.Login} component={LoginView}/>
                <Stack.Screen name={PATH.Home} component={HomeView}/>
                <Stack.Screen name={PATH.OTP} component={OTPview} />
                <Stack.Screen name={PATH.requestLeave} component={LeaveRequestView}/>
                <Stack.Screen name={PATH.detailLeave} component={LeaveDetailView}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator