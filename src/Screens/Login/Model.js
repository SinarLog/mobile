import { useState } from "react"
import { postLogin } from "../../Network/AuthenticationFlow/RemoteStorage"

const LoginModel = () => {
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
            console.log('SUCCESS POST LOGIN',result);
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