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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import EmployeeView from "../Screens/Employee/View"
import ProfileView from "../Screens/Profile/View"
import HomeIcon from "../assets/homeIcon/homeIcon.png"
import EmployeeIcon from "../assets/usersIcon/usersIcon.png"
import HistoryIcon from "../assets/fileTextIcon/fileTextIcon.png"
import ProfileIcon from "../assets/userIcon/userIcon.png"
import { Image } from "react-native"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import MyLeaveRequestView from "../Screens/MyLeaveRequest/View"
import MyOvertimeSubmissionView from "../Screens/MyOvertimeSubmission/View"
import MyAttendanceLogView from "../Screens/MyAttendanceLog/View"
import WhosTakingLeaveView from "../Screens/WhosTakingLeave/View"
import OvertimeDetailView from "../Screens/OvertimeDetail/View"
import ProposalView from "../Screens/Proposal/View"
import IncomingLeaveDetailView from "../Screens/IncomingLeaveDetail/View"
import IncomingOvertimeDetailView from "../Screens/IncomingOvertimeDetail/View"

const ProfileStack = createNativeStackNavigator()
const ProfileStackScreen = () => (
    <ProfileStack.Navigator initialRouteName={PATH.profile} screenOptions={{headerShown: false}}>
        <ProfileStack.Screen name={PATH.profile} component={ProfileView}/>
    </ProfileStack.Navigator>
)

const HistoryStack = createNativeStackNavigator()
const HistoryStackScreen = () => (
    <HistoryStack.Navigator initialRouteName={PATH.proposal} screenOptions={{headerShown: false}}>
        <HistoryStack.Screen name={PATH.proposal} component={ProposalView}/>
        <HistoryStack.Screen name={PATH.incomingLeaveDetail} component={IncomingLeaveDetailView}/>
        <HistoryStack.Screen name={PATH.incomingOvertimeDetail} component={IncomingOvertimeDetailView}/>
    </HistoryStack.Navigator>
)

const EmployeeStack = createNativeStackNavigator()
const EmployeeStackScreen = () => (
    <EmployeeStack.Navigator initialRouteName={PATH.employee} screenOptions={{headerShown: false}}>
        <EmployeeStack.Screen name={PATH.employee} component={EmployeeView}/>
    </EmployeeStack.Navigator>
)

const HomeStack = createNativeStackNavigator()
const HomeStackScreen = () => (
    <HomeStack.Navigator initialRouteName={PATH.Home} screenOptions={{headerShown: false}}>
        <HomeStack.Screen name={PATH.Home} component={HomeView}/>
        <HomeStack.Screen name={PATH.OTP} component={OTPview} />
        <HomeStack.Screen name={PATH.requestLeave} component={LeaveRequestView}/>
        <HomeStack.Screen name={PATH.detailLeave} component={LeaveDetailView}/>
        <HomeStack.Screen name={PATH.myLeaveRequest} component={MyLeaveRequestView}/>
        <HomeStack.Screen name={PATH.myOvertimeSubmission} component={MyOvertimeSubmissionView}/>
        <HomeStack.Screen name={PATH.myAttendanceLog} component={MyAttendanceLogView}/>
        <HomeStack.Screen name={PATH.whosTakingLeave} component={WhosTakingLeaveView}/>
        <HomeStack.Screen name={PATH.detailOvertime} component={OvertimeDetailView}/>
    </HomeStack.Navigator>
)

const Tab = createBottomTabNavigator()
const MainTab = () => {
    return (
        <Tab.Navigator 
            initialRouteName={PATH.tabHome} 
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#E54646',
                tabBarInactiveTintColor: '#4C4C4C',
                tabBarStyle: {paddingBottom:8,paddingTop:8},
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return <Image source={HomeIcon} style={{width:20, height:20, tintColor: color}}/>
                    } else if (route.name === 'Employee') {
                        return <Image source={EmployeeIcon} style={{width:20, height:20, tintColor: color}}/>
                    } else if (route.name === 'History') {
                        return <Image source={HistoryIcon} style={{width:20, height:20, tintColor: color}}/>
                    } else {
                        return <Image source={ProfileIcon} style={{width:20, height:20, tintColor: color}}/>
                    }
                } 
            })}
        >
            <Tab.Screen name={PATH.tabHome} component={HomeStackScreen}/>
            <Tab.Screen name={PATH.tabEmployee} component={EmployeeStackScreen}/>
            <Tab.Screen name={PATH.tabHistory} component={HistoryStackScreen}/>
            <Tab.Screen name={PATH.tabProfile} component={ProfileStackScreen}/>
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator()
const AppNavigator = () => {
    return (
        <BottomSheetModalProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={PATH.Splash} screenOptions={{headerShown: false}}>
                    <Stack.Screen name={PATH.Splash} component={SplashView}/>
                    <Stack.Screen name={PATH.OnBoarding} component={OnBoardingView}/>
                    <Stack.Screen name={PATH.Login} component={LoginView}/>
                    <Stack.Screen name={PATH.tabMain} component={MainTab}/>
                </Stack.Navigator>
            </NavigationContainer>
        </BottomSheetModalProvider>
    )
}

export default AppNavigator