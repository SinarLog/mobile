import { View, Pressable, Image, Text, TextInput } from "react-native"
import ForgotPasswordModel from "./Model"
import ChevronBackIcon from "../../assets/chevronCloseIcon/chevronCloseIcon.png"
import MyPasswordIcon from "../../assets/myPasswordPanaIcon/myPasswordPanaIcon.png"

const ForgotPasswordView = ({ navigation }) => {
    const { emailView } = ForgotPasswordModel({ navigation })

    return (
        <View className="flex-1 bg-backgroundHome">
            <View className="flex-row px-6 pt-6 items-center justify-center">
                <Pressable className="absolute left-6 top-6" onPress={() => navigation.goBack()}>
                    <Image source={ChevronBackIcon}/>
                </Pressable>
                <Text className="text-base text-OTPHitam font-bold">Forgot Password</Text>
            </View>
            <View className="items-center justify-center mt-20 mx-7">
                <Image source={MyPasswordIcon} style={{maxWidth:244, maxHeight:212}}/>
                <Text className="text-xs text-OTPHitam font-normal text-center mt-6">Enter your email associated with your account and we'll send email with instruction to reset your password</Text>
            </View>
            <View className="mx-7 mt-6">
                <Text className="text-xs text-OTPHitam font-semibold">Email</Text>
                <View className={`py-2 px-4 rounded-lg bg-InactiveLightActive mt-2 ${emailView.error ? 'border border-PrimaryNormal' : ''}`}>
                    <TextInput
                        placeholder="Your email here"
                        style={{padding:0, color: "black"}}
                        value={emailView.email}
                        onChangeText={(text) => emailView.setEmail(text)}
                    />
                </View>
                {
                    emailView.error ?

                    <Text className="text-PrimaryNormal text-xs font-normal">your email has not already registered</Text>
                    :
                    null
                }
            </View>
            <Pressable 
                className= {`py-2 px-4 items-center rounded-lg mx-7 mt-6 ${ emailView.email === '' ? 'bg-InactiveNormal' : 'bg-PrimaryNormal'}`} 
                onPress={emailView.handlePostEmail} disabled={emailView.email === ''}
            >
                <Text className={`text-white text-base font-semibold ${ emailView.email === '' ? 'text-InactiveDarker' : 'text-white'}`}>Send Email</Text>
            </Pressable>
        </View>
    )
}

export default ForgotPasswordView