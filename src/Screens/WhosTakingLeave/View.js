import { FlatList, Image, Pressable, Text, TextInput, View } from "react-native"
import ChevronBackIcon from "../../assets/chevronCloseIcon/chevronCloseIcon.png"
import SearchIcon from "../../assets/searchIcon/searchIcon.png"
import XCircleIcon from "../../assets/xCircleIcon/xCircleIcon.png"
import WhosTakingLeaveModel from "./Model"
import { getInitials } from "../../utils/helper"

const WhosTakingLeaveView = ({ navigation }) => {
    const { takingLeaves, search } = WhosTakingLeaveModel({ navigation })

    return (
        <View className="bg-backgroundHome">
            {
                search.searchView ?
                <View className="bg-white flex-row items-center justify-between mt-7 mx-6 px-4 py-2 border border-InactiveDarker rounded-lg">
                    <TextInput
                        placeholder="Search by name"
                        className="text-xs flex-1 mr-2 text-black"
                        onPressIn={() => search.setInputFocused(true)}
                        onBlur={() => search.setInputFocused(false)}
                        style={{paddingVertical:0}}
                        value={search.value}
                        onChangeText={(text) => search.setValue(text)}
                    />
                    {
                        search.inputFocused ?
                        <Pressable 
                            onPress={() => {
                                search.setValue('')
                                search.setSearchView(!search.searchView)
                            }}
                        >
                            <Image source={XCircleIcon} style={{width: 20, height:20}} />
                        </Pressable>
                        :
                        <Pressable onPress={() => search.setSearchView(!search.searchView)}>
                            <Image source={SearchIcon} style={{width: 20, height:20}} />
                        </Pressable>
                    }
                </View>
                :
                <View className="bg-white flex-row items-center justify-between pt-7 px-6">
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image source={ChevronBackIcon}/>
                    </Pressable>
                    <Text className="text-textHitam text-sm font-semibold">Who's Taking leave</Text>
                    <Pressable onPress={() => search.setSearchView(!search.searchView)}>
                        <Image source={SearchIcon} style={{width: 20, height:20}}/>
                    </Pressable>
                </View>
            }
            <FlatList 
                data={takingLeaves}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                className="mt-4 px-6"
                renderItem={({ item }) => (
                    <Pressable className="bg-white mb-2 rounded"> 
                        <View className="flex-row items-center py-2 justify-between px-4">
                            <View className="flex-row items-center">
                                {
                                    item.avatar ? 
                                    <Image source={{uri: item.avatar}} style={{width: 24, height: 24, borderRadius: 12, marginRight: 8}}/>
                                    :
                                    <View className='w-6 h-6 rounded-full bg-white mr-2 items-center justify-center border'>
                                        <Text style={{fontSize:10}}>{getInitials(item.fullName)}</Text>
                                    </View>
                                }
                                <Text className="text-black text-xs">{item.fullName}</Text>
                            </View>
                            <Text className="text-black text-xs capitalize">{item.type}</Text>
                        </View>
                        <View className="h-0 bg-InactiveNormal mx-4" style={{borderWidth:0.125}}></View>
                        <View className="items-end px-4 py-2">
                            <View className="flex-row">
                                <Text className="text-black text-xs">{item.from}</Text>
                                <Text className="text-black text-xs ml-4">{item.to}</Text>
                            </View>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    )
}

export default WhosTakingLeaveView