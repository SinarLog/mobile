import { useState } from "react"
import { postLogin } from "../../Network/AuthenticationFlow/RemoteStorage"
import { setUserDefault } from "../../LocalStorage/UserDefault"
import PATH from "../../Navigator/PathNavigation"
import { getClockInLocalData, removeClockIn, removeclockout } from "../../LocalStorage/AttendanceData"

const LoginModel = ({ navigation }) => {
    const [error, setError] = useState({
        isNotValid: false,
        isEmpty: true
    })
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (key, inputValue) => {
        setLoginData({
            ...loginData,
            [key]: inputValue
        })
        if (loginData.email !== '' && loginData.password !== '') {
            setError({
                ...error,
                ['isEmpty']: false
            })
        }
    }

    const handleLoginButton = () => {
        handlePostLogin()
    }

    const handlePostLogin = async () => {
        try {
            const result = await postLogin(loginData)
            await setUserDefault(result.data)

            const prevClockInData = await getClockInLocalData()
            const nowDate = new Date().getDate()
            if (prevClockInData) {
                if (prevClockInData.dateClockedIn !== nowDate) {
                    await removeClockIn()
                    await removeclockout()
                }
            }
            navigation.replace(PATH.Home)
        } catch (err) {
            console.log('ERROR POST LOGIN', err);
            setError({
                ...error,
                ['isNotValid']: true
            })
        }
    }

    return { 
        loginData,
        error,
        handleInputChange,
        handleLoginButton
    }
}

export default LoginModel