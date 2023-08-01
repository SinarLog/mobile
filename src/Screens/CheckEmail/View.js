import { Image, Pressable, Text, View } from "react-native"
import EmailIcon from "../../assets/emailPanaIcon/emailPanaIcon.png"

const CheckEmailView = ({ navigation }) => {

    return (
        <View className="flex-1 bg-backgroundHome items-center justify-center mx-7">
            <View>
                <View className="items-center">
                    <Image source={EmailIcon} style={{maxWidth:296, maxHeight:198}}/>
                    <Text className="text-SecondaryDarker text-base font-bold mt-6">Check Your Email</Text>
                    <Text className="text-SecondaryDarker text-xs font-normal mt-4 text-center">We have sent a email to reset your pass word</Text>
                </View>
                <Pressable className="py-2 px-4 items-center rounded-md bg-PrimaryNormal mt-12" onPress={() => navigation.popToTop()}>
                    <Text className="text-white text-base font-semibold">Continue Log In</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default CheckEmailView