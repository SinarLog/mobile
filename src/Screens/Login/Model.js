import { useState } from "react"
import { postLogin } from "../../Network/AuthenticationFlow/RemoteStorage"
import { setUserDefault } from "../../LocalStorage/UserDefault"
import PATH from "../../Navigator/PathNavigation"

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

            navigation.replace(PATH.Home)
        } catch (err) {
            console.log('ERROR POST LOGIN', JSON.stringify(err));
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