import AsyncStorage from "@react-native-async-storage/async-storage"

export const setClockIn = async () => {
    try {
        const date = new Date().getDate()
        const hours = new Date().getHours()
        const minutes = new Date().getMinutes()
        const seconds = new Date().getSeconds()
        const timestamp = `${hours}:${minutes}:${seconds}`

        const ClockInData = {
            isClockedIn : true,
            timeClockedIn : timestamp,
            dateClockedIn : date
        }

        await AsyncStorage.setItem('@clockin', JSON.stringify(ClockInData))
    } catch (error) {
        console.log('Error set clockin');
    }
}

export const getClockIn = async () => {
    try {
        const clockin = await AsyncStorage.getItem('@clockin')
        return JSON.parse(clockin)
    } catch (error) {
        console.log('Error get clockin',error);
    }
}

export const removeClockIn = async () => {
    try {
        await AsyncStorage.removeItem('@clockin')
    } catch (error) {
        console.log('Error Remove clockin', error);
    }
}