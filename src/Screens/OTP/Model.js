import PATH from "../../Navigator/PathNavigation"
import { postClockIn } from "../../Network/AttendanceFlow/RemoteStorage"

const { useState, useEffect } = require("react")

const OTPModel = ({ navigation, route }) => {
    const { position } = route.params

    const [otpCode, setOTPCode] = useState("")
    const [isPinReady, setIsPinReady] = useState(false)
    const maximumCodeLength = 6
    const [difference, setDifference] = useState(80000)
    const calculateTimeLeft = () => {

        let timeLeft = {}

        if (difference > 0) {
            timeLeft = {
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        }
        return timeLeft
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(()=>{
        if (difference > 0) {
            setTimeout(() => {
                setTimeLeft(calculateTimeLeft())
                setDifference(difference - 1000)
            }, 1000);
        }
    })

    const handleVerifyButton = async () => {
        try {
            const clockInData = {
                otp: otpCode,
                lat: position.coords.latitude,
                long: position.coords.longitude
            }
            await postClockIn(clockInData)
            navigation.replace(PATH.Home)
        } catch (error) {
            console.log('Error Post Clock In', error);
        }
    }

    return {
        otpCode,
        setOTPCode,
        isPinReady, 
        setIsPinReady,
        maximumCodeLength,
        difference,
        timeLeft,
        handleVerifyButton
    }
}

export default OTPModel