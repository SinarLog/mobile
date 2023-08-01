import { Image, Text, TextInput, View, TouchableHighlight, Pressable } from "react-native"
import LogoLabelIcon from "../../assets/logoLabelIcon/logoLabelIcon.png"
import CloseIcon from "../../assets/closeIcon/closeIcon.png"
import ErrorIcon from "../../assets/errorIcon/errorIcon.png"
import PasswordIcon from "../../assets/passwordIcon/passwordIcon.png"
import PasswordOpenIcon from "../../assets/passwordOpenIcon/passwordOpenIcon.png"
import LoginModel from "./Model"
import { BottomSheetModal } from "@gorhom/bottom-sheet"


const LoginView = ({ navigation }) => {
    const { 
        loginData,
        error,
        bottomSheet,
        passwordView,
        handleInputChange,
        handleLoginButton,
        handleForgotPassword
    } = LoginModel({ navigation })

    return (
        <View className="flex-1 px-6 bg-white">
            <Image source={LogoLabelIcon} style={{width: 149, height: 36}} className="my-16"/>
            <Text className="text-xl font-semibold text-black">Login</Text>
            <Text className="text-xs font-medium text-black mt-3">Log in to easily manage your attendance</Text>
            <Text className="text-xs font-semibold text-black mt-20">Email</Text>
            <TextInput
                placeholder="email@email.com"
                className="mt-3 px-5 bg-InactiveLight rounded-lg text-black"
                onChangeText={(text) => handleInputChange('email',text)}
                value={loginData.email}

            />
            <View className="flex-row justify-between">
                <Text className="text-xs font-semibold text-black mt-5">Password</Text>
                <Pressable onPress={handleForgotPassword}>
                    <Text className="text-xs font-semibold text-PrimaryNormal mt-5">Forgot your password?</Text>
                </Pressable>
            </View>
            <View className="flex-row items-center justify-between mt-3 py-2 px-5 bg-InactiveLight rounded-lg">
                <TextInput
                    placeholder="password here"
                    onChangeText={(text) => handleInputChange('password',text)}
                    value={loginData.password}
                    style={{padding:0}}
                    secureTextEntry={passwordView.password}
                    className="text-black"
                />
                <Pressable onPress={() => passwordView.setPassword(!passwordView.password)}>
                    <Image source={passwordView.password ? PasswordIcon : PasswordOpenIcon} style={{width:22, height:19}}/>
                </Pressable>
            </View>
            {
                error.isNotValid ? 
                <View className="flex justify-center items-center bg-PrimaryNormal/[0.1] py-2 mt-2 mb-6 rounded-lg">
                    <Text className="text-xs font-semibold text-PrimaryNormal">Invalid email or password</Text>
                </View> 
                : null
            }
            
            <TouchableHighlight 
                className={`${error.isEmpty ? 'bg-InactiveNormal' : 'bg-PrimaryNormal'} rounded-xl items-center py-3 mt-6`}
                onPress={handleLoginButton}
                disabled= {error.isEmpty}
            >
                <Text className="text-white text-base">Login</Text>
            </TouchableHighlight>
            <BottomSheetModal
                ref={bottomSheet.bottomSheetError}
                index={1}
                snapPoints={bottomSheet.snapPoints}
                backdropComponent={bottomSheet.renderBackdrop}
                className="rounded-2xl bg-white"
            >
                <View className="items-center px-8 ">
                    <Pressable className="absolute right-2 top-1" onPress={bottomSheet.handleBottomSheetErrorDismiss}>
                        <Image source={CloseIcon}/>
                    </Pressable>
                    <Image source={ErrorIcon} style={{width:60, height:60}}/>
                    <Text className="text-black font-semibold text-xl">Error</Text>
                    <Text className="text-black font-medium text-xs text-center mt-4">{bottomSheet.errorMessage}</Text>
                </View>
            </BottomSheetModal>
        </View>
    )
}

export default LoginView