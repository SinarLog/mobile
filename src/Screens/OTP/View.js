import { View, Pressable, Keyboard, TouchableOpacity, Text, Image } from "react-native"
import OTPModel from "./Model"
import OTPInput from "./OTPInput";
import OTPIcon from "../../assets/OTPIcon/OTPIcon.png"

const OTPview = ({ navigation, route }) => {

    const {
        otpCode,
        setOTPCode,
        isPinReady, 
        setIsPinReady,
        maximumCodeLength,
        difference,
        timeLeft,
        handleVerifyButton
    } = OTPModel({ navigation, route })

    return (
        <Pressable className="flex-1 bg-white items-center justify-center px-6" onPress={Keyboard.dismiss}>
            <Image source={OTPIcon} />
            <Text className="text-OTPHitam text-2xl font-bold mt-8">OTP Verification</Text>
            <Text className="text-OTPHitam text-xs font-normal mt-2">Please check your email to see the verification code</Text>
            <OTPInput 
                code={otpCode}
                setCode={setOTPCode}
                maximumLength={maximumCodeLength}
                setIsPinReady={setIsPinReady}
                />

            <TouchableOpacity
                disabled={!isPinReady}
                onPress={handleVerifyButton}
                className={`${!isPinReady ? 'bg-InactiveNormal': 'bg-PrimaryNormal'} py-3 mt-6 w-full items-center rounded-lg`}
                >
                <Text className={`${!isPinReady ? 'text-InactiveDarker': 'text-white'} `}>Verify</Text>
            </TouchableOpacity>
            <View className="flex-row items-center justify-center mt-4">
                <Text className="text-OTPHitam font-normal text-xs">Didn't get the code? </Text>
                <Pressable disabled={difference > 0}>
                    <Text className={`${difference <= 0 ? 'text-PrimaryNormal': 'text-OTPHitam'} font-bold text-xs`}>Resend </Text>
                </Pressable>
                <Text className="text-OTPHitam font-normal text-xs">to </Text>
                <Text className="text-PrimaryNormal font-normal text-xs">0{timeLeft.minutes}:{timeLeft.seconds < 10 ? 0 : null}{timeLeft.seconds}</Text>
            </View>

        </Pressable>
    )
}

export default OTPview