import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { getProfile } from "../../Network/ProfileFlow/RemoteStorage"
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import PATH from "../../Navigator/PathNavigation"
import { removeUserDefault } from "../../LocalStorage/UserDefault"

const ProfileModel = ({ navigation }) => {
    const [profile, setProfile] = useState([])

    useEffect(() => {
        loadProfile()
    },[])

    const loadProfile = async () => {
        try {
            const data = await getProfile()
            setProfile([data])
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