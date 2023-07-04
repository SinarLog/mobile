import AsyncStorage from "@react-native-async-storage/async-storage"

export const setClockIn = async () => {
    try {
        const date = new Date().getDate()
        const hours = new Date().getHours()
        const minutes = new Date().getMinutes()
        const seconds = new Date().getSeconds()
        const timestamp = `${hours < 10 ? '0'+hours : hours}:${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`

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

export const getClockInLocalData = async () => {
    try {
        const clockin = await AsyncStorage.getItem('@clockin')
        if (clockin) {
            return JSON.parse(clockin)
        }
        return clockin
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

export const setclockout = async () => {
    try {
        const date = new Date().getDate()
        const hours = new Date().getHours()
        const minutes = new Date().getMinutes()
        const seconds = new Date().getSeconds()
        const timestamp = `${hours < 10 ? '0'+hours : hours}:${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`

        const clockoutData = {
            isClockedOut : true,
            timeClockedOut : timestamp,
            dateClockedOut : date
        }

        await AsyncStorage.setItem('@clockout', JSON.stringify(clockoutData))
    } catch (error) {
        console.log('Error set clockout');
    }
}

export const getclockoutLocalData = async () => {
    try {
        const clockout = await AsyncStorage.getItem('@clockout')
        if (clockout) {
            return JSON.parse(clockout)
        }
        return clockout
    } catch (error) {
        console.log('Error get clockout',error);
    }
}

export const removeclockout = async () => {
    try {
        await AsyncStorage.removeItem('@clockout')
    } catch (error) {
        console.log('Error Remove clockout', error);
    }
}