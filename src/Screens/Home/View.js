import { Text, View, ImageBackground, Image, Pressable, FlatList } from "react-native"
import homeBackgroundIcon from "../../assets/homeBackgroundIcon/homeBackgroundIcon.png"
import SunIcon from "../../assets/sunIcon/sunIcon.png"
import ArrowLeftIcon from "../../assets/arrowLeftIcon/arrowLeftIcon.png"
import ArrowRightIcon from "../../assets/arrowRightIcon/arrowRightIcon.png"
import CloseIcon from "../../assets/closeIcon/closeIcon.png"
import CheckIcon from "../../assets/checkIcon/checkIcon.png"
import ErrorIcon from "../../assets/errorIcon/errorIcon.png"
import HomeModel from "./Model"
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet"
import LeaveView from "./components/LeaveView"
import AnalyticsView from "./components/AnalyticsView"
import TabLeaveView from "./components/TabLeaveView"
import TakingLeaveView from "./components/TakingLeaveView"
import { getInitials, getTimeString } from "../../utils/helper"
import AttendanceView from "./components/AttendanceView"


const HomeView = ({ navigation }) => {
    const { date, userData, clockIn, clockOut, formattedDate, userAnalytics, leaveRequest, bottomSheet, reasonOvertime, refreshing, overtimeSubmissions, takingLeaves, attendaceLogs, errorMessage, handleClockIn, handleRequestClockOut, setReasonOvertime, handleRequestLeave, handleDetailLeave, handleDetailOvertime, setRefreshing, handleLeaveViewAll, handleOvertimeViewAll, handleTakingLeaveViewAll, handleAttendanceViewAll } = HomeModel({ navigation })

    const dataLayout = [{id: 0, userData, clockIn, clockOut, formattedDate, userAnalytics, leaveRequest, handleClockIn, handleRequestClockOut, handleRequestLeave, handleDetailLeave }]

    return (

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
                                {
                                    item.userData.avatar ?
                                    <Image source={{uri: item.userData.avatar}} style={{width: 32, height: 32, borderRadius: 16}} />
                                    :
                                    <View className="w-8 h-8 bg-white rounded-2xl items-center justify-center">
                                        <Text style={{fontSize: 12}}>{ item.userData.fullName ? getInitials(item.userData.fullName) : ''}</Text>
                                    </View>
                                }
                            </View>

                        </ImageBackground>
                        <View className="bg-white mx-6 rounded-lg p-4 -mt-10 drop-shadow-lg">
                            <View className="flex-row justify-between">
                                <Text className="font-normal text-xs text-textHitam">Attendance</Text>
                                <Text className="font-normal text-xs text-textHitam">{item.formattedDate}</Text>
                                <Text className="font-normal text-xs text-textHitam">{date.format("hh:mm:ss")}</Text>
                            </View>
                            <View className="flex-row mt-4 items-center">
                                <Image source={SunIcon} style={{width:16, height:16}}/>
                                <Text className="ml-5 font-normal text-xs text-textHitam text-start break-all">Hello, {item.userData.fullName ? item.userData.fullName: ''}! Have a wonderful time ahead.</Text>
                            </View>
                            <View className="flex-row mt-4 items-center justify-between">
                                {
                                    item.clockIn ?
                                    <>
                                    <Pressable 
                                        className={`flex-1 flex-row ${item.clockIn.clockInAt ? 'bg-clockBackground' :'bg-SuccessNormal'} py-3 items-center justify-center rounded-lg`}
                                        onPress={item.handleClockIn}
                                        disabled={item.clockIn.clockInAt != null}
                                        >
                                        <Image source={ArrowLeftIcon} style={item.clockIn.clockInAt ? {tintColor:'#4C4C4C'} : null}/>
                                        <Text className={`font-normal text-xs ${item.clockIn.clockInAt ? 'text-InactiveDarker':'text-SuccessLight'} ml-3`}>Clock In</Text>
                                    </Pressable>
                                    <Pressable 
                                        className={`flex-1 flex-row ml-4 ${item.clockIn.clockOutAt ? 'bg-clockBackground' :'bg-PrimaryNormal'} py-3 items-center justify-center rounded-lg`}
                                        onPress={item.handleRequestClockOut}
                                        disabled={item.clockIn.clockOutAt != null}
                                        >
                                        <Image source={ArrowRightIcon} style={item.clockIn.clockOutAt ? {tintColor:'#4C4C4C'} : null}/>
                                        <Text className={`font-normal text-xs ${item.clockIn.clockOutAt ? 'text-InactiveDarker':'text-SuccessLight'} ml-3`}>Clock Out</Text>
                                    </Pressable>
                                    </>
                                    : null
                                }
                            </View>
                            {   item.clockIn ?
                                item.clockIn.clockInAt ?
                                <View className="flex-row mt-4 items-center justify-between">
                                    <View className="flex-row items-center">
                                        <Image source={ArrowLeftIcon} style={{width:24,height:24,tintColor:'#4BB543',marginRight:21}}/>
                                        <Text className="text-textHitam font-medium text-xs">{getTimeString(item.clockIn.clockInAt)}</Text>
                                    </View>
                                {
                                    item.clockIn.clockOutAt ?
                                    <View className="flex-row items-center">
                                        <Image source={ArrowRightIcon} style={{width:24,height:24,tintColor:'#E54646',marginRight:21}}/>
                                        <Text className="text-textHitam font-medium text-xs">{getTimeString(item.clockIn.clockOutAt)}</Text>
                                    </View>
                                    : null
                                }
                                </View>
                                : null
                                : null
                            }

                        </View>
                        {/* {
                            userData.role ?
                            userData.role.name === 'Manager' ? 
                            <IncomingView />
                            : null
                            : null
                        } */}
                        <AnalyticsView 
                            userAnalytics={userAnalytics} 
                            handleRequestLeave={handleRequestLeave}
                        />
                        {
                            userData.role ? 
                            userData.role.name === 'Staff' ?

                            <TabLeaveView 
                                leaveRequest={leaveRequest} 
                                handleDetailLeave={handleDetailLeave} 
                                overtimeSubmissions={overtimeSubmissions} 
                                handleDetailOvertime={handleDetailOvertime}
                                handleLeaveViewAll={handleLeaveViewAll}
                                handleOvertimeViewAll={handleOvertimeViewAll}
                            />
                            :
                            <LeaveView leaveRequest={leaveRequest} handleDetailLeave={handleDetailLeave} handleViewAll={handleLeaveViewAll}/>
                            : 
                            null
                        }
                        <TakingLeaveView takingLeaves={takingLeaves} handleViewAll={handleTakingLeaveViewAll}/>
                        <AttendanceView attendanceLog={attendaceLogs} handleViewAll={handleAttendanceViewAll} navigation={navigation}/>
                    </View>
                )}
            />
            <BottomSheetModal
                ref={bottomSheet.bottomSheetOvertimeConfirmation}
                index={1}
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
                index={2}
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
                            marginTop:22,
                            color: "black"
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
            <BottomSheetModal
                ref={bottomSheet.bottomSheetError}
                index={1}
                snapPoints={bottomSheet.snapPoints}
                backdropComponent={bottomSheet.renderBackdrop}
                className="rounded-2xl bg-white"
            >
                <View className="items-center px-8 ">
                    <Pressable className="absolute right-2 top-1" onPress={bottomSheet.handleModalErrorDismiss}>
                        <Image source={CloseIcon}/>
                    </Pressable>
                    <Image source={ErrorIcon} style={{width:60, height:60}}/>
                    <Text className="text-black font-semibold text-xl">Error</Text>
                    <Text className="text-black font-medium text-xs text-center mt-4">{errorMessage}</Text>
                </View>
            </BottomSheetModal>
        </View>
    )
}

export default HomeView