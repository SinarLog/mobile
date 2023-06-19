import { View, Image, FlatList, Dimensions, Text, Animated, useWindowDimensions } from "react-native"
import OnBoardingModel from "./Model"

const OnBoardingView = ({ navigation }) => {
    const { 
        slides, 
        scrollX,
        currentIndex,
        viewConfig,
        slidesRef,
        handleLoginButton,
        viewableItemsChanged
    } = OnBoardingModel({navigation}) 

    return (
        <View className="flex-1 bg-white">
            <FlatList 
                data={slides}
                renderItem={SlideView}
                keyExtractor={(item) => item.id }
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={Animated.event([{ nativeEvent: {contentOffset: {x: scrollX}}}], {
                    useNativeDriver: false
                })}
                scrollEventThrottle={32}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
            />
            <Paginator data={slides} scrollX={scrollX}/>
        </View>
    )
}

export default OnBoardingView

const Paginator = ({data, scrollX}) => {
    const { width } = useWindowDimensions()
    return (
        <View className="flex-row mb-6 items-center justify-center" style={{height: 40}}>
            {
                data.map((_,i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width]

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [12,24,12],
                        extrapolate: 'clamp'
                    })

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp'
                    })
                    return (
                        <Animated.View className="rounded-md bg-SecondaryDarker mr-4" style={{width:dotWidth,height:12, opacity}} key={i.toString()}/>
                    )
                })
            }
        </View>
    )
}

const SlideView = ({ item }) => {
    return (
        <View 
            style={{width: Dimensions.get('window').width}}
            className="flex-1 items-center justify-center px-6"
        >
            <Image 
                source={item.image} 
                style={{width: 292, height: 293}}

            />
            <Text className="text-SecondaryDarker font-bold text-base mt-20 text-center">{item.title}</Text>
            <Text className="text-xs text-SecondaryDarker font-normal mt-12 text-center">{item.desc}</Text>
        </View>
    )
}