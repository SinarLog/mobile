import React, { useRef, useState, useEffect } from "react"
import { View, Text, Pressable, TextInput } from "react-native"

const OTPInput = ({ code, setCode, maximumLength, setIsPinReady }) => {
    const boxArray = new Array(maximumLength).fill(0);
    const inputRef = useRef();
  
    const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);
  
    const handleOnPress = () => {
      setIsInputBoxFocused(true);
      inputRef.current.focus();
    };
  
    const handleOnBlur = () => {
      setIsInputBoxFocused(false);
    };
  
    useEffect(() => {
      // update pin ready status
      setIsPinReady(code.length === maximumLength);
      // clean up function
      return () => {
        setIsPinReady(false);
      };
    }, [code]);
    const boxDigit = (_, index) => {
      const emptyInput = "_";
      const digit = code[index] || emptyInput;
  
      const isCurrentValue = index === code.length;
      const isLastValue = index === maximumLength - 1;
      const isCodeComplete = code.length === maximumLength;
  
      const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);
  
      const StyledSplitBoxes =
        isInputBoxFocused && isValueFocused

      return (
        <View className={`${StyledSplitBoxes ? 'border-InactiveDarker': 'border-InactiveNormal'} border-2 rounded p-3`} key={index}>
            <Text className="font-normal text-textHitam text-center text-xl">{digit}</Text>
        </View>
      );
    };
  
    return (
        <View className="items-center justify-center mt-8">
            <Pressable onPress={handleOnPress} className="flex-row w-full justify-around">
                {boxArray.map(boxDigit)}
            </Pressable>
            <TextInput
            value={code}
            onChangeText={setCode}
            maxLength={maximumLength}
            ref={inputRef}
            onBlur={handleOnBlur}
            inputMode="numeric"
            className='absolute opacity-0'
            />
        </View>
    );
  };
  
  export default OTPInput;