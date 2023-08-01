import AsyncStorage from "@react-native-async-storage/async-storage"

export const setLoginDatas = async (loginData) => {
    try {
        await AsyncStorage.setItem('@logindata', JSON.stringify(loginData))
    } catch (error) {
        console.log('Error set LoginData');
    }
}

export const getLoginData = async () => {
    try {
        const userDefault = await AsyncStorage.getItem('@logindata')
        return JSON.parse(userDefault)
    } catch (error) {
        console.log('Error get LoginData',error);
    }
}

export const removeLoginData = async () => {
    try {
        await AsyncStorage.removeItem('@logindata')
    } catch (error) {
        console.log('Error Remove LoginData', error);
    }
}