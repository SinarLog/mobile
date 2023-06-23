import { Image, View } from "react-native"
import LogoIcon from "../../assets/logoIcon/logoIcon.png"
import LabelIcon from "../../assets/labelIcon/labelIcon.png"
import React, { useEffect } from 'react';
import PATH from "../../Navigator/PathNavigation";
import { checkOnboarding } from "../../LocalStorage/ViewedOnboarding";


const SplashView = ({ navigation }) => {
    useEffect(()=>{
        const timer = setTimeout( async () => {
            const viewedOnboarding = await checkOnboarding()

            if (viewedOnboarding) {
                navigation.replace(PATH.Login)
            } else {
                navigation.replace(PATH.OnBoarding)
            }
        }, 3000);

        return () => clearTimeout(timer)
    },[navigation])
    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Image source={LogoIcon} style={{width: 195, height: 236}} />
            <Image source={LabelIcon} style={{width: 147, height: 39}} />

        </View>
    )
}

export default SplashView