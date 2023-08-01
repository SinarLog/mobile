import { useState, useRef, useMemo, useCallback, useEffect } from "react"
import { postLogin } from "../../Network/AuthenticationFlow/RemoteStorage"
import { getUserDefault, setUserDefault } from "../../LocalStorage/UserDefault"
import PATH from "../../Navigator/PathNavigation"
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import { getLoginData, setLoginDatas } from "../../LocalStorage/loginData"
import { isBiometricSupport } from "../../Biometrics/Biometrics"

const LoginModel = ({ navigation }) => {
    const [error, setError] = useState({
        isNotValid: false,
        isEmpty: true
    })
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const[password, setPassword] = useState(true)

    const passwordView = {
        password, setPassword
    }

    useEffect(() => {
        handleBiometrics()
    },[])

    const handleInputChange = (key, inputValue) => {
        const newData = { ...loginData, [key]: inputValue }
        setLoginData(newData)

        if (newData.email !== '' && newData.password !== '') {
            setError({
                ...error,
                ['isEmpty']: false
            })
        } else {
            setError({
                ...error,
                ['isEmpty']: true
            })
        }
    }

    const handleLoginButton = () => {
        handlePostLogin()
    }

    const handlePostLogin = async () => {
        try {
            const result = await postLogin(loginData)
            
            if (result.role.name === 'HR') {
                setErrorMessage('HR cant Login')
                handleBottomSheetErrorPresent()
            } else {
                await setUserDefault(result)
                await setLoginDatas(loginData)
                navigation.replace(PATH.tabMain)
            }
        } catch (err) {
            console.log('ERROR POST LOGIN', err)
            setError({
                ...error,
                ['isNotValid']: true
            })
            setErrorMessage(error)
        }
    }

    const handleBiometrics = async () => {
        try {
            const isLoggedIn = await getUserDefault()
            if (isLoggedIn) {

                const support = await isBiometricSupport()
                console.log('result',support)
                if (support) {
                    const login = await getLoginData()
                    const result = await postLogin(login)
                    await setUserDefault(result)
                    navigation.replace(PATH.tabMain)
                }
            }
        } catch (error) {
            console.log('Error Biometric',error);
        }
    }

    const handleForgotPassword = () => {
        navigation.navigate(PATH.forgotPassword)
    }

    const [errorMessage, setErrorMessage] = useState('')
    const bottomSheetError = useRef(null)
    const snapPoints = useMemo(() => ['15%','25%','40%'],[])
    const handleBottomSheetErrorPresent = useCallback(() => {
        bottomSheetError.current?.present()
    },[])
    const handleBottomSheetErrorDismiss = useCallback(() => {
        bottomSheetError.current?.dismiss()
    },[])
    const renderBackdrop = useCallback( 
        props => (
            <BottomSheetBackdrop
            {...props}
            appearsOnIndex={1}
            disappearsOnIndex={0}
        />
        )
    ,[])

    const bottomSheet = {
        errorMessage,
        bottomSheetError,
        snapPoints,
        renderBackdrop,
        handleBottomSheetErrorPresent,
        handleBottomSheetErrorDismiss
    }

    return { 
        loginData,
        error,
        bottomSheet,
        passwordView,
        handleInputChange,
        handleLoginButton,
        handleForgotPassword
    }
}

export default LoginModel