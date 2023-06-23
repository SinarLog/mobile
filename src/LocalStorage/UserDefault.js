import AsyncStorage from "@react-native-async-storage/async-storage"

export const setUserDefault = async (loginData) => {
    try {
        await AsyncStorage.setItem('@userdefault', JSON.stringify(loginData))
    } catch (error) {
        console.log('Error set UserDefault');
    }
}

export const getUserDefault = async () => {
    try {
        const userDefault = await AsyncStorage.getItem('@userdefault')
        return JSON.parse(userDefault)
    } catch (error) {
        console.log('Error get UserDefault',error);
    }
}

export const removeUserDefault = async () => {
    try {
        await AsyncStorage.removeItem('@userdefault')
    } catch (error) {
        console.log('Error Remove UserDefault', error);
    }
}