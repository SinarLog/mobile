// import * as React from 'react';
// import {
//   Animated,
//   View,
//   Pressable,
//   Text
// } from 'react-native';
// import { TabView } from 'react-native-tab-view';
// import LeaveView from './LeaveView';

// export default class TabLeaveView extends React.Component {
//     state = {
//         index: 0,
//         routes: [
//             { key: 'first', title: 'Leave'},
//             { key: 'second', title: 'Overtime'}
//         ],
//     }

//     _handleIndexChange = (index) => this.setState({ index });

//     _renderTabBar = (props) => {
//         const inputRange = props.navigationState.routes.map((x,i) => i)
//         return (
//             <View style={{backgroundColor:'white',flexDirection:'row',marginTop:32,marginHorizontal:24, borderRadius:16, justifyContent:'space-around'}}>
//                 {props.navigationState.routes.map((route,i) => {
//                     const backgroundColor = props.position.interpolate({
//                         inputRange,
//                         outputRange: inputRange.map((inputIndex) =>
//                           inputIndex === i ? 'rgba(229, 70, 70, 1)' : 'rgba(255, 255, 255, 1)'
//                         ),
//                     })
//                     const color = props.position.interpolate({
//                         inputRange,
//                         outputRange: inputRange.map((inputIndex) =>
//                           inputIndex === i ? 'rgba(255, 255, 255, 1)' : 'rgba(229, 70, 70, 1)' 
//                         ),
//                     })
//                     return (
//                         <Animated.Pressable style={{backgroundColor, flex:1, paddingVertical:8, borderRadius:16, alignItems:'center'}} onPress={() => setIndex(i)}>
//                             <Animated.Text style={{color, fontSize:16, fontWeight:400}}>{route.title}</Animated.Text>
//                         </Animated.Pressable>
//                     )
//                 })}
//             </View>
//         )
//     }

//     _renderScene = ({ route }) => {
//         switch (route.key) {
//             case 'first':
//                 return <LeaveView leaveRequest={leaveRequest} handleDetailLeave={handleDetailLeave}/>
//             case 'second':
//                 <LeaveView leaveRequest={leaveRequest} handleDetailLeave={handleDetailLeave}/>
//             default:
//                 return null
//         }
//     }

//     render() {
//         return (
//             <TabView 
//                 navigationState={this.state}
//                 renderScene={this._renderScene}
//                 renderTabBar={this._renderTabBar}
//                 onIndexChange={this._handleIndexChange}
//             /> 
//         )
//     }
// }