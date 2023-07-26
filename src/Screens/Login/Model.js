import { useState, useRef, useMemo, useCallback } from "react"
import { postLogin } from "../../Network/AuthenticationFlow/RemoteStorage"
import { setUserDefault } from "../../LocalStorage/UserDefault"
import PATH from "../../Navigator/PathNavigation"
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet"

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
        const newData = { ...loginData, [key]: inputValue }
        setLoginData(newData)

        if (newData.email !== '' && newData.password !== '') {
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
            
            if (result.role.name === 'HR') {
                setErrorMessage('HR cant Login')
                handleBottomSheetErrorPresent()
            } else {
                await setUserDefault(result)
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
        handleInputChange,
        handleLoginButton
    }
}

export default LoginModel