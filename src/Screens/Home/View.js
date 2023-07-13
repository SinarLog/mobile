import { Animated, Text, View, ImageBackground, Image, Pressable, FlatList } from "react-native"
import homeBackgroundIcon from "../../assets/homeBackgroundIcon/homeBackgroundIcon.png"
import SunIcon from "../../assets/sunIcon/sunIcon.png"
import ArrowLeftIcon from "../../assets/arrowLeftIcon/arrowLeftIcon.png"
import ArrowRightIcon from "../../assets/arrowRightIcon/arrowRightIcon.png"
import CloseIcon from "../../assets/closeIcon/closeIcon.png"
import CheckIcon from "../../assets/checkIcon/checkIcon.png"
import HomeModel from "./Model"
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetTextInput } from "@gorhom/bottom-sheet"
import LeaveView from "./components/LeaveView"
import IncomingView from "./components/IncomingView"
import AnalyticsView from "./components/AnalyticsView"
import { TabView } from "react-native-tab-view"
import { useState } from "react"


const HomeView = ({ navigation }) => {
    const { userData, clockIn, clockOut, formattedDate, userAnalytics, leaveRequest, bottomSheet, reasonOvertime, refreshing, handleClockIn, handleRequestClockOut, setReasonOvertime, handleRequestLeave, handleDetailLeave, setRefreshing } = HomeModel({ navigation })

    const dataLayout = [{id: 0, userData, clockIn, clockOut, formattedDate, userAnalytics, leaveRequest, handleClockIn, handleRequestClockOut, handleRequestLeave, handleDetailLeave }]

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        {key: 'first', title: 'Leave'},
        {key: 'second', title: 'Overtime'}
    ])
    const _handleIndexChange = (index) => setIndex(index)
    const _renderTabBar = props => {
        console.log(props.navigationState.routes);
        const inputRange = props.navigationState.routes.map((x, i) => i)
        return (
            <View style={{backgroundColor:'white',flexDirection:'row',marginTop:32,marginHorizontal:24, borderRadius:16, justifyContent:'space-around'}}>
                {props.navigationState.routes.map((route, i) => {
                    const backgroundColor = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) =>
                          inputIndex === i ? 'rgba(229, 70, 70, 1)' : 'rgba(255, 255, 255, 1)'
                        ),
                    })
                    const color = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) =>
                          inputIndex === i ? 'rgba(255, 255, 255, 1)' : 'rgba(229, 70, 70, 1)' 
                        ),
                    })
                    return (
                        <Pressable 
                            key={route.key} 
                            style={{borderRadius:16, alignItems:'center'}} 
                            onPress={() => setIndex(i)}
                        >
                            <Animated.Text style={{color, backgroundColor, flex:1, fontSize:16, fontWeight:400, marginVertical: 8}}>{route.title}</Animated.Text>
                        </Pressable>
                    )
                })}
            </View>
        )
    }
    const _renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <LeaveView leaveRequest={leaveRequest} handleDetailLeave={handleDetailLeave}/>
            case 'second':
                return <LeaveView leaveRequest={leaveRequest} handleDetailLeave={handleDetailLeave}/>
            default:
                return null
        }
    }

    return (
        <BottomSheetModalProvider>

        <View className="bg-backgroundHome">
            <FlatList
                data={dataLayout}
                keyExtractor={item => item.id}
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
                renderItem={({ item }) => (
                    <View className="mb-6"> 
                        <ImageBackground source={homeBackgroundIcon} style={{height:180, width:'100%'}}>
                            <View className="flex-row mt-16 mx-6 justify-between items-center">
                                <View>
                                    <Text className="font-normal text-xl text-white">{item.userData.fullName ? item.userData.fullName: ''}</Text>
                                    <Text className="font-normal text-xs text-white">{item.userData.job ? item.userData.job.name: ''}</Text>
                                </View>
                                <View className="w-8 h-8 bg-white rounded-2xl"></View>
                            </View>

                        </ImageBackground>
                        <View className="bg-white mx-6 rounded-lg p-4 -mt-10 drop-shadow-lg">
                            <View className="flex-row justify-between">
                                <Text className="font-normal text-xs text-textHitam">Attendance</Text>
                                <Text className="font-normal text-xs text-textHitam">{item.formattedDate}</Text>
                                <Text className="font-normal text-xs text-textHitam">08:15:23</Text>
                            </View>
                            <View className="flex-row mt-4 items-center">
                                <Image source={SunIcon} style={{width:16, height:16}}/>
                                <Text className="ml-5 font-normal text-xs text-textHitam text-start break-all">Good Morning {item.userData.fullName ? item.userData.fullName: ''}. You have not clock in yet. Have a good day</Text>
                            </View>
                            <View className="flex-row mt-4 items-center justify-between">
                                <Pressable 
                                    className={`flex-1 flex-row ${item.clockIn ? 'bg-clockBackground' :'bg-SuccessNormal'} py-3 items-center justify-center rounded-lg`}
                                    onPress={item.handleClockIn}
                                    disabled={item.clockIn !== null}
                                    >
                                    <Image source={ArrowLeftIcon} style={item.clockIn ? {tintColor:'#4C4C4C'} : null}/>
                                    <Text className={`font-normal text-xs ${item.clockIn ? 'text-InactiveDarker':'text-SuccessLight'} ml-3`}>Clock In</Text>
                                </Pressable>
                                <Pressable 
                                    className={`flex-1 flex-row ml-4 ${item.clockOut ? 'bg-clockBackground' :'bg-PrimaryNormal'} py-3 items-center justify-center rounded-lg`}
                                    onPress={item.handleRequestClockOut}
                                    disabled={item.clockOut !== null}
                                >
                                    <Image source={ArrowRightIcon} style={item.clockOut ? {tintColor:'#4C4C4C'} : null}/>
                                    <Text className={`font-normal text-xs ${item.clockOut ? 'text-InactiveDarker':'text-SuccessLight'} ml-3`}>Clock Out</Text>
                                </Pressable>
                            </View>
                            {   item.clockIn ?
                                <View className="flex-row mt-4 items-center justify-between">
                                    <View className="flex-row items-center">
                                        <Image source={ArrowLeftIcon} style={{width:24,height:24,tintColor:'#4BB543',marginRight:21}}/>
                                        <Text className="text-textHitam font-medium text-xs">{item.clockIn.timeClockedIn}</Text>
                                    </View>
                                {
                                    item.clockOut ?
                                    <View className="flex-row items-center">
                                        <Image source={ArrowRightIcon} style={{width:24,height:24,tintColor:'#E54646',marginRight:21}}/>
                                        <Text className="text-textHitam font-medium text-xs">{item.clockOut.timeClockedOut}</Text>
                                    </View>
                                    : null
                                }
                                </View>
                            : null
                            }

                        </View>
                        {
                            userData.role ?
                            userData.role.name === 'Manager' ? 
                            <IncomingView />
                            : null
                            : null
                        }
                        <AnalyticsView userAnalytics={userAnalytics} handleRequestLeave={handleRequestLeave}/>
                        
                        {/* <View className="bg-white flex-row mt-8 mx-6 rounded-2xl justify-around">
                            <Pressable className="flex-1 bg-PrimaryNormal py-2 rounded-2xl items-center mr-2">
                                <Text className="text-base text-white font-normal">Leave</Text>
                            </Pressable>
                            <Pressable className="flex-1  py-2 rounded-2xl items-center">
                                <Text className="text-base text-PrimaryNormal font-normal">Overtime</Text>
                            </Pressable>
                        </View> */}
                        <TabView 
                            navigationState={{ index, routes }}
                            renderScene={_renderScene}
                            renderTabBar={props => _renderTabBar(props)}
                            onIndexChange={_handleIndexChange}
                        />
                        {/* <TabLeaveView /> */}
                        {/* <LeaveView leaveRequest={leaveRequest} handleDetailLeave={handleDetailLeave}/> */}
                        
                    </View>
                )}
            />
            <BottomSheetModal
                ref={bottomSheet.bottomSheetOvertimeConfirmation}
                index={0}
                snapPoints={bottomSheet.snapPoints}
                backdropComponent={bottomSheet.renderBackdrop}
                className="rounded-2xl bg-white"
            >
                <View className="items-center px-8">
                    <Pressable className="absolute right-2 top-1" onPress={bottomSheet.handleModalOvertimeClose}>
                        <Image source={CloseIcon}/>
                    </Pressable>
                    <Text className="text-black font-semibold text-xl">overtime</Text>
                    <Text className="text-black font-medium text-xs text-center mt-4">You're worked longer than you're supposed to. is it because of overtime?</Text>
                    <View className="flex-row justify-between mt-6">
                        <Pressable
                            className="flex-1 bg-white items-center py-2 rounded-md"
                            onPress={bottomSheet.handleModalOvertimeReject}
                        >
                            <Text className="text-PrimaryNormal text-base">No</Text>
                        </Pressable>
                        <View style={{flex:0.5}}>

                        </View>
                        <Pressable
                            className="flex-1 bg-PrimaryNormal items-center py-2 rounded-md"
                            onPress={bottomSheet.handleModalOvertimeConfirmationYes}
                        >
                            <Text className="text-white text-base">Yes</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheetModal>
            <BottomSheetModal
                ref={bottomSheet.bottonSheetOvertimeReason}
                index={1}
                snapPoints={bottomSheet.snapPoints}
                backdropComponent={bottomSheet.renderBackdrop}
                keyboardBehavior="fillParent"
                className="rounded-2xl bg-white"
            >
                <View className="items-center px-8 ">
                    <Pressable className="absolute right-2 top-1" onPress={bottomSheet.handleModalOvertimeReasonClose}>
                        <Image source={CloseIcon}/>
                    </Pressable>
                    <Text className="text-black font-semibold text-xl">overtime</Text>
                    <Text className="text-black font-medium text-xs text-center mt-4">What is your overtime reason?</Text>
                    <BottomSheetTextInput 
                        multiline
                        placeholder="Type your reason here!"
                        textAlignVertical="top"
                        value={reasonOvertime}
                        onChangeText={setReasonOvertime}
                        style={{
                            borderRadius:8,
                            backgroundColor: '#F3F3F3',
                            alignItems: 'flex-start',
                            height: 169,
                            alignSelf: 'stretch',
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            marginTop:22
                        }}
                    />
                    <View className="flex-row mt-6">
                        <Pressable
                            className="flex-1 bg-PrimaryNormal items-center py-2 rounded-md"
                            onPress={(event) => bottomSheet.handleModalOvertimeReasonSubmit(reasonOvertime)}
                        >
                            <Text className="text-white text-base">Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheetModal>
            <BottomSheetModal
                ref={bottomSheet.bottomSheetSuccess}
                index={1}
                snapPoints={bottomSheet.snapPoints}
                backdropComponent={bottomSheet.renderBackdrop}
                keyboardBehavior="fillParent"
                className="rounded-2xl bg-white"
            >
                <View className="items-center px-8 ">
                    <Pressable className="absolute right-2 top-1" onPress={bottomSheet.handleModalOvertimeSuccessClose}>
                        <Image source={CloseIcon}/>
                    </Pressable>
                    <Image source={CheckIcon} />
                    <Text className="text-black font-semibold text-xl">Success</Text>
                    <Text className="text-black font-medium text-xs text-center mt-4">Thank you for your hard work</Text>
                </View>
            </BottomSheetModal>
        </View>
    </BottomSheetModalProvider>
    )
}

export default HomeView