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
            title: "Welcome to SinarLog!",
            desc: "To ensure you make the most of our platform, here are three key benefits you'll discover while using Sinarlog"
        },
        {
            id: 1,
            image: secondOnboardingIcon,
            title: "Simplify Attedance with Just One Click!",
            desc: "With SinarLog, you can mark your attendance with just a click, enjoy the ease without the need for complicated paperwork"
        },
        {
            id: 2,
            image: thirdOnboardingIcon,
            title: "Effortless Leave Request!",
            desc: "Our leave request process allows you to fill in your leave details quickly, you can plan on your well-deserved time-off stress free"
        },
        {
            id: 3,
            image: FourthOnboardingIcon,
            title: "Streamlined Attendance and Leave Management!",
            desc: "SinarLog provides you with an intuitive system where  you can access your records anytime, anywhere with just a few clicks"
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