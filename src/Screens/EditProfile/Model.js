import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { getProfile, updateProfile } from "../../Network/ProfileFlow/RemoteStorage"
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet"

const EditProfileModel = ({ navigation }) => {
    const [profile, setProfile] = useState([])

    useEffect(() => {
        loadProfile()
    },[])

    const loadProfile = async () => {
        try {
            const data = await getProfile()
            setProfile([data])
            setInput({
                ...input, 
                personalPhoneNumber: data.biodata.phoneNumber.replace(/^\+62-/, ''),
                personalAddress: data.biodata.address,
                emerName: data.emergencyContacts[0].fullName,
                emerPhoneNumber: data.emergencyContacts[0].phoneNumber.replace(/^\+62-/, '')
            })
            setValue(data.emergencyContacts[0].relation)
        } catch (error) {
            console.log('Error get Profile', error);
        }
    }

    const handleSaveButton = async () => {
        try {
            let contacts = [
                {
                    id: profile[0].emergencyContacts[0].id,
                    employeeId: profile[0].emergencyContacts[0].employeeId,
                    fullName: input.emerName,
                    relation: value,
                    phoneNumber: input.emerPhoneNumber === profile[0].emergencyContacts[0].phoneNumber.replace(/^\+62-/, '') ? profile[0].emergencyContacts[0].phoneNumber : input.emerPhoneNumber
                }
            ]
    
            if (newContact) {
                const newEmer = {
                    fullName: input.newName,
                    relation: valueNew,
                    phoneNumber: input.newPhoneNumber
                }
                contacts = [...contacts, newEmer]
            }
    
            const profileData = {
                id: profile[0].id,
                phoneNumber: input.personalPhoneNumber === profile[0].biodata.phoneNumber.replace(/^\+62-/, '') ? profile[0].biodata.phoneNumber : input.personalPhoneNumber,
                address: input.personalAddress,
                contacts: contacts
            }
            await updateProfile(profileData)
            navigation.goBack()

        } catch (error) {
            console.log('Error Update Profile', error)
            setErrorMessage(error)
            handleBottomSheetErrorPresent()
        }
    }

    const [input, setInput] = useState({
        personalPhoneNumber: "",
        personalAddress: "",
        emerName: "",
        emerPhoneNumber: "",
        newName: "",
        newPhoneNumber: "",
    })
    const handleInputChange = (key, text) => {
        setInput({...input, [key]: text})
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

    const [openRelationType, setopenRelationType] = useState(false)
    const [value, setValue] = useState()
    const [items, setItems] = useState([
        {label: 'Father', value: 'FATHER'},
        {label: 'Mother', value: 'MOTHER'},
        {label: 'Spouse', value: 'SPOUSE'},
        {label: 'Sibling', value: 'SIBLING'},
    ])

    const [newContact, setNewContact] = useState(false)
    const [openNewType, setopenNewType] = useState(false)
    const [valueNew, setValueNew] = useState()
    const [itemsNew, setItemsNew] = useState([
        {label: 'Father', value: 'FATHER'},
        {label: 'Mother', value: 'MOTHER'},
        {label: 'Spouse', value: 'SPOUSE'},
        {label: 'Sibling', value: 'SIBLING'},
    ])

    const bottomSheet = {
        errorMessage,
        bottomSheetError,
        snapPoints,
        renderBackdrop,
        handleBottomSheetErrorPresent,
        handleBottomSheetErrorDismiss
    }

    const dropdown = {
        openRelationType,
        value,
        items,
        setValue,
        setopenRelationType
    }

    const dropdownNew = {
        openNewType,
        valueNew,
        itemsNew,
        newContact,
        setValueNew,
        setopenNewType,
        setNewContact
    }

    const inputText = {
        input,
        handleInputChange
    }

    return {
        profile,
        bottomSheet,
        dropdown,
        dropdownNew,
        inputText,
        handleSaveButton
    }
}

export default EditProfileModel