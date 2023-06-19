import { Image, Text, TextInput, View, TouchableHighlight } from "react-native"
import LogoLabelIcon from "../../assets/logoLabelIcon/logoLabelIcon.png"
import LoginModel from "./Model"


const LoginView = () => {
    const { 
        loginData,
        error,
        handleInputChange,
        handleLoginButton
    } = LoginModel()

    return (
        <View className="flex-1 px-6 bg-white">
            <Image source={LogoLabelIcon} style={{width: 149, height: 36}} className="my-16"/>
            <Text className="text-xl font-semibold text-black">Login</Text>
            <Text className="text-xs font-medium text-black mt-3">Log in to easily manage your attendance</Text>
            <Text className="text-xs font-semibold text-black mt-20">Email</Text>
            <TextInput
                placeholder="email@email.com"
                className="mt-3 px-5 bg-InactiveLight rounded-lg"
                onChangeText={(text) => handleInputChange('email',text)}
                value={loginData.email}
            />
            <View className="flex-row justify-between">
                <Text className="text-xs font-semibold text-black mt-5">Password</Text>
                <Text className="text-xs font-semibold text-PrimaryNormal mt-5">Forgot your password?</Text>
            </View>
            <TextInput
                placeholder="password here"
                className="mt-3 px-5 bg-InactiveLight rounded-lg"
                onChangeText={(text) => handleInputChange('password',text)}
                value={loginData.password}
                secureTextEntry={true}
            />
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
            >
                <Text className="text-white text-base">Login</Text>
            </TouchableHighlight>
        </View>
    )
}

export default LoginView