import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import PATH from "./PathNavigation"
import SplashView from "../Screens/Splash/View"
import OnBoardingView from "../Screens/OnBoarding/View"
import LoginView from "../Screens/Login/View"

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={PATH.Splash} screenOptions={{headerShown: false}}>
                <Stack.Screen name={PATH.Splash} component={SplashView}/>
                <Stack.Screen name={PATH.OnBoarding} component={OnBoardingView}/>
                <Stack.Screen name={PATH.Login} component={LoginView}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator