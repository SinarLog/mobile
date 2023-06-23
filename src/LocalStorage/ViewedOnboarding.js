import AsyncStorage from "@react-native-async-storage/async-storage"

export const checkOnboarding = async () => {
    try {
        const value = await AsyncStorage.getItem('@viewedOnboarding')
        
        if (value) {
            return true
        }
    } catch (error) {
        console.log('Error Check Onboarding',error);
    }
}

export const setOnboarding = async () => {
    try {
        await AsyncStorage.setItem('@viewedOnboarding','true')
    } catch (error) {
        console.log('Error set Onboarding', error);
    }
}

export const removeOnboarding = async () => {
    try {
        await AsyncStorage.removeItem('@viewedOnboarding')
    } catch (error) {
        console.log('Error Remove Onboarding');
    }
}