import { useState } from "react"
import { postForgotPassword } from "../../Network/PublicFlow/RemoteStorage"
import PATH from "../../Navigator/PathNavigation"

const ForgotPasswordModel = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const handlePostEmail = async () => {
        try {
            const emailData = {
                email: email
            }
            await postForgotPassword(emailData)
            navigation.navigate(PATH.checkEmail)
        } catch (error) {
            console.log('Error post forgot password', error)
            setError(error)
        }
    }

    const emailView = {
        email,
        error,
        setEmail,
        handlePostEmail
    }

    return {
        emailView
    }
}

export default ForgotPasswordModel