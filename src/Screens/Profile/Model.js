import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { getProfile } from "../../Network/ProfileFlow/RemoteStorage"
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import PATH from "../../Navigator/PathNavigation"
import { removeLoginData } from "../../LocalStorage/loginData"
import { removeUserDefault } from "../../LocalStorage/UserDefault"

const ProfileModel = ({ navigation }) => {
    const [profile, setProfile] = useState([])

    useEffect(() => {
        loadProfile()
    },[])

    const loadProfile = async () => {
        try {
            const data = await getProfile()
            let color
            if (data.status === 'UNAVAILABLE') {
                color= '#A3A3A3'
            } else if (data.status === "AVAILABLE") {
                color= '#4BB543'
            } else if (data.status === "RESIGN") {
                color= '#E54646'
            }
            else {
                color= '#F0AD4E'
            }
            const updatedData = {...data, color: color }
            setProfile([updatedData])
        } catch (error) {
            console.log('Error get Profile', error);
        }
    }

    const bottomSheetLogout = useRef(null)
    const snapPoints = useMemo(() => ['15%','25%','40%'],[])
    const handleBottomSheetLogoutPresent = useCallback(() => {
        bottomSheetLogout.current?.present()
    },[])
    const handleBottomSheetLogoutDismiss = useCallback(() => {
        bottomSheetLogout.current?.dismiss()
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
    const handleLogout = async () => {
        await removeLoginData()
        await removeUserDefault()
        navigation.replace(PATH.Login)
    }

    const bottomSheet = {
        bottomSheetLogout,
        snapPoints,
        handleBottomSheetLogoutDismiss,
        handleBottomSheetLogoutPresent,
        renderBackdrop,
        handleLogout
    }

    return {
        profile,
        bottomSheet
    }

}

export default ProfileModel