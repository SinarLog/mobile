import React, { useEffect, useState } from 'react';
import {
  Text,
  Pressable,
  View,
  Image,
  Platform,
  UIManager,
  LayoutAnimation,
  FlatList
} from 'react-native';
import ChevronDownIcon from "../../../assets/chevronDownIcon/chevronDownIcon.png"
import { getInitials } from '../../../utils/helper';

if(Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionView = ({ item }) => {
    const [expanded, setExpanded] = useState(false)
    const [myArray, setMyArray] = useState([])

    const toggleItem = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded)
    }
    
    useEffect(() => {
        const newArray = []
        for (let key in item.changes) {
            newArray.push({ key, value: item.changes[key]})
        }
        setMyArray(newArray)
    },[])

    return (
        <View className="py-2 px-4 mx-6 mb-2 bg-white">
            <View className="flex-row items-center">
                {
                    item.updatedBy.avatar ? 
                    <Image source={{uri: item.updatedBy.avatar}} style={{width: 24, height: 24, borderRadius: 12, marginRight: 8}}/>
                    :
                    <View className='w-6 h-6 rounded-full bg-white mr-2 items-center justify-center border'>
                        <Text style={{fontSize:10}}>{getInitials(item.updatedBy.fullName)}</Text>
                    </View>
                }
                <Text className="text-black text-xs">{item.updatedBy.fullName}</Text>
            </View>
            <View className="mt-4">
                <Text className="text-black text-xs">{item.updatedAt}</Text>
            </View>
            {
                expanded ?
                <>
                <View style={{borderColor: "#F3F3F3", borderWidth: 0.5, marginTop:16}}></View>
                <FlatList
                    data={myArray}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <>
                        <View className="items-center mt-4">
                            <Text className="text-textHitam text-xs font-semibold capitalize">Update {item.key}</Text>
                        </View>
                        <View className="mt-2">
                            <Text className="text-black text-xs font-semibold">From</Text>
                            <Text className="text-black text-xs font-normal">{item.value.prev}</Text>
                        </View>
                        <View className="mt-2">
                            <Text className="text-black text-xs font-semibold">To</Text>
                            <Text className="text-black text-xs font-normal">{item.value.new}</Text>
                        </View>
                        </>
                    )}
                />
                </>
                :
                null
            }
            <Pressable className="flex-row mt-4" onPress={toggleItem}>
                <Text className="font-normal mr-2" style={{color:"#2B7CC9", fontSize: 10}}>Show {expanded ? 'less' : 'changes'}</Text>
                <Image source={ChevronDownIcon} style={{width: 16, height:16, tintColor:"#2B7CC9"}} className={`${ expanded ? 'origin-center rotate-180' : ''}`}/>
            </Pressable>
        </View>
    )
}

export default AccordionView