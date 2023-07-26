import { View, FlatList, Image, Text, Pressable } from "react-native"
import ActivityLogModel from "./Model"
import ChevronBackIcon from "../../assets/chevronCloseIcon/chevronCloseIcon.png"
import AccordionView from "./components/AccordionView"

const ActivityLogView = ({ navigation, route }) => {
    const { changeLogs } = ActivityLogModel({ navigation, route })

    return (
        <View className="flex-1 bg-backgroundHome">
            <View className="bg-white flex-row p-6 items-center justify-center mb-4">
                <Pressable className="absolute left-6" onPress={() => navigation.goBack()}>
                    <Image source={ChevronBackIcon}/>
                </Pressable>
                <Text className="text-base text-textHitam font-bold">Activity Log</Text>
            </View>
            <FlatList
                data={changeLogs}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <AccordionView item={item} />
                )}
            />
        </View>
    )
}

export default ActivityLogView