import { View, Pressable, Image, Text, TextInput } from "react-native"
import ChevronBackIcon from "../../assets/chevronCloseIcon/chevronCloseIcon.png"
import PasswordIcon from "../../assets/passwordIcon/passwordIcon.png"
import PasswordOpenIcon from "../../assets/passwordOpenIcon/passwordOpenIcon.png"
import CloseIcon from "../../assets/closeIcon/closeIcon.png"
import ErrorIcon from "../../assets/errorIcon/errorIcon.png"
import UpdatePasswordModel from "./Model"
import { BottomSheetModal } from "@gorhom/bottom-sheet"

const UpdatePasswordView = ({ navigation }) => {
    const { visibility, input, saveButton, bottomSheet } = UpdatePasswordModel({ navigation })

    return (
        <View className="flex-1 bg-backgroundHome">
            <View className="flex-row px-6 pt-6 items-center justify-center">
                <Pressable className="absolute left-6 top-6" onPress={() => navigation.goBack()}>
                    <Image source={ChevronBackIcon}/>
                </Pressable>
                <Text className="text-base text-OTPHitam font-bold">Update Password</Text>
            </View>
            <View className="mx-6 mt-6">
                <Text className="text-xs text-textHitam font-semibold">New Password</Text>
                <View className="flex-row items-center justify-between py-2 px-4 mt-2 bg-InactiveLightActive rounded-lg">
                    <TextInput 
                        placeholder="New password"
                        style={{padding:0}}
                        secureTextEntry={visibility.passwordVisible.new}
                        maxLength={20}
                        className="flex-1"
                        value={input.new}
                        onChangeText={(text) => input.handleInputChange('new', text)}
                    />
                    <Pressable onPress={() => visibility.handleVisibility('new', !visibility.passwordVisible.new)}>
                        <Image source={ visibility.passwordVisible.new ? PasswordIcon : PasswordOpenIcon} style={{width:22, height:19}}/>
                    </Pressable>
                </View>
            </View>
            <View className="mx-6 mt-6">
                <Text className="text-xs text-textHitam font-semibold">Confirm Password</Text>
                <View className="flex-row items-center justify-between py-2 px-4 mt-2 bg-InactiveLightActive rounded-lg">
                    <TextInput 
                        placeholder="Confirm password"
                        style={{padding:0}}
                        secureTextEntry={visibility.passwordVisible.confirm}
                        maxLength={20}
                        className="flex-1"
                        value={input.confirm}
                        onChangeText={(text) => input.handleInputChange('confirm', text)}
                    />
                    <Pressable onPress={() => visibility.handleVisibility('confirm', !visibility.passwordVisible.confirm)}>
                        <Image source={ visibility.passwordVisible.confirm ? PasswordIcon : PasswordOpenIcon} style={{width:22, height:19}}/>
                    </Pressable>
                </View>
            </View>
            <Pressable 
                className={`${saveButton.button ? 'bg-InactiveDark' : 'bg-SuccessNormal'} mx-6 mt-6 py-2 px-4 rounded-lg items-center`} 
                disabled={saveButton.button} 
                onPress={saveButton.handleButton}
            >
                <Text className="text-white text-base font-semibold">Save</Text>
            </Pressable>
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

export default UpdatePasswordView