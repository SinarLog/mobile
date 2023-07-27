import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { updatePassword } from "../../Network/ProfileFlow/RemoteStorage"
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet"

const UpdatePasswordModel = ({ navigation }) => {

    const [passwordVisible, setPasswordVisible] = useState({
        new: true,
        confirm: true
    })
    const [password, setPassword] = useState({
        new: "",
        confirm: ""
    })
    const [button, setButton] = useState(true)

    const handleVisibility = (key, inputValue) => {
        const newData = { ...passwordVisible, [key]: inputValue }
        setPasswordVisible(newData)
    }

    const handleInputChange = (key, inputValue) => {
        const newData = { ...password, [key]: inputValue }
        setPassword(newData)

        if (newData.new === newData.confirm) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    const handleButton = async () => {
        try {
            const leaveData = {
                newPassword: password.new,
                confirmPassword: password.confirm
            }
            await updatePassword(leaveData)
            navigation.pop()
        } catch (error) {
            console.log('Error Update Password', error)
            setErrorMessage(error)
            handleBottomSheetErrorPresent()
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

    const visibility = {
        passwordVisible,
        handleVisibility
    }

    const input = {
        password,
        handleInputChange
    }

    const saveButton = {
        button,
        handleButton
    }

    return {
        visibility,
        input,
        saveButton,
        bottomSheet
    }
}

export default UpdatePasswordModel