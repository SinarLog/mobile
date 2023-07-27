import { View, Text, FlatList, ImageBackground, Pressable } from "react-native"
import homeBackgroundIcon from "../../assets/homeSmallBackgroundIcon/homeSmallBackgroundIcon.png"
import ProposalModel from "./Model"
import React from "react"
import IncomingViews from "./components/IncomingView"
import HistoryView from "./components/HistoryView"

const ProposalView = ({ navigation }) => {
    const { topView, incomingView } = ProposalModel({ navigation })
    const data = [{id:0}]

    return (
        <View className="bg-backgroundHome">
            <FlatList 
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <View>
                        <ImageBackground source={homeBackgroundIcon} style={{height:120, width:'100%', display:"flex", justifyContent:"flex-end"}}>
                            <View className="flex-row mb-8 mx-6 rounded-2xl justify-around">
                                <Pressable 
                                    className={`flex-1 ${topView.topTabView === 'Incoming' ? 'bg-white' : ''} py-2 rounded-2xl items-center mr-2`}
                                    onPress={() => {
                                        topView.setTopTabView('Incoming')
                                        incomingView.setIncomingTabView('Leave')
                                    }}
                                >
                                    <Text className={`text-base ${topView.topTabView === 'Incoming' ? 'text-PrimaryNormal' : 'text-white'} font-normal`}>Incoming</Text>
                                </Pressable>
                                <Pressable 
                                    className={`flex-1 ${topView.topTabView === 'History' ? 'bg-white' : ''} py-2 rounded-2xl items-center`}
                                    onPress={() => topView.setTopTabView('History')}
                                >
                                    <Text className={`text-base ${topView.topTabView === 'History' ? 'text-PrimaryNormal' : 'text-white'} font-normal`}>History</Text>
                                </Pressable>
                            </View>
                        </ImageBackground>
                        {
                            topView.topTabView === 'Incoming' ?
                            
                            <IncomingViews incoming={incomingView} navigation={navigation} />
                            :
                            <HistoryView incoming={incomingView} navigation={navigation} />
                        }
                    </View>
                )}
            />
        </View>
    )
}

export default ProposalView