import PATH from "../../Navigator/PathNavigation"
import {useRef, useState} from "react"
import {Animated} from 'react-native'
import firstOnboardingIcon from '../../assets/firstOnboardingIcon/firstOnboardingIcon.png'
import secondOnboardingIcon from '../../assets/secondOnboardingIcon/secondOnboardingIcon.png'
import thirdOnboardingIcon from '../../assets/thirdOnboardingIcon/thirdOnboardingIcon.png'
import FourthOnboardingIcon from "../../assets/forthOnboardingIcon/forthOnboardingIcon.png"
import { setOnboarding } from "../../LocalStorage/ViewedOnboarding"

const OnBoardingModel = ({navigation}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current
    const slidesRef = useRef(null)

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current

    const handleLoginButton = async () => {
        await setOnboarding()
        navigation.navigate(PATH.Login)
    }

    const scrollTo = () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({index: slides.length - 1})
        }
    }

    const slides = [
        {
            id: 0,
            image: firstOnboardingIcon,
            title: "Selamat datang di SinarLog!",
            desc: "Untuk memastikan Anda dapat memanfaatkan platform kami dengan maksimal, berikut adalah tiga manfaat utama yang akan Anda temukan saat menggunakan SinarLog"
        },
        {
            id: 1,
            image: secondOnboardingIcon,
            title: "Kemudahan Mengisi Kehadiran hanya Sekali Klik",
            desc: "Isi kehadiran Anda hanya dengan sekali klik. Tanpa ribet mengisi lembar absensi manual"
        },
        {
            id: 2,
            image: thirdOnboardingIcon,
            title: "Pengajuan Cuti Mudah",
            desc: "Proses pengajuan cuti menjadi lebih mudah. Sistem intuitif kami memungkinkan Anda mengisi detail cuti dengan cepat"
        },
        {
            id: 3,
            image: FourthOnboardingIcon,
            title: "Well-Managed Data",
            desc: "Your attendance and leave data is managed properly and securely. The privacy and security of your information is our priority"
        }
    ]
    

    return {
        currentIndex,
        slides, 
        scrollX,
        scrollTo,
        viewConfig,
        slidesRef,
        handleLoginButton,
        viewableItemsChanged
    }
}

export default OnBoardingModel