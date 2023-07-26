import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  UIManager,
  LayoutAnimation
} from 'react-native';
import ChevronDownIcon from "../../../assets/chevronDownIcon/chevronDownIcon.png"

if(Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const AccordionView = ({ children, title }) => {
    const [expanded, setExpanded] = useState(false)

    const toggleItem = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded)
    }

    const body = <View>{ children }</View>

    return (
        <View className="bg-white px-4 mt-6 py-4 border border-textHitam rounded-lg">
            <TouchableOpacity onPress={toggleItem} className="flex-row justify-between mb-2 items-center">
                <Text className="text-textHitam text-xs font-semibold">{ title }</Text>
                <Image source={ChevronDownIcon} />
            </TouchableOpacity>
            { expanded && body }
        </View>
    )
}

export default AccordionView