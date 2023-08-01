import { View, Pressable, Image, Text, TextInput, FlatList } from "react-native"
import EditProfileModel from "./Model"
import ChevronBackIcon from "../../assets/chevronCloseIcon/chevronCloseIcon.png"
import PlusIcon from "../../assets/plusIcon/plusIcon.png"
import CloseIcon from "../../assets/closeIcon/closeIcon.png"
import ErrorIcon from "../../assets/errorIcon/errorIcon.png"
import DropDownPicker from "react-native-dropdown-picker"
import { BottomSheetModal } from "@gorhom/bottom-sheet"

const EditProfileView = ({ navigation }) => {
    const { profile, bottomSheet, dropdown, dropdownNew, inputText, handleSaveButton } = EditProfileModel({ navigation })

    return (
        <View className="flex-1 bg-backgroundHome">
            <View className="bg-white flex-row px-6 pt-6 pb-2 items-center justify-center">
                <Pressable className="absolute left-6 top-6" onPress={() => navigation.goBack()}>
                    <Image source={ChevronBackIcon}/>
                </Pressable>
                <Text className="text-base text-OTPHitam font-bold">Edit Profile</Text>
            </View>
            <FlatList
                data={profile}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View className="mx-6 mt-6">
                        <Text className="text-textHitam text-xs font-bold">Personal Information</Text>
                        <Text className="text-textHitam text-xs font-semibold mt-6">Phone Number</Text>
                        <View className="flex-row mt-2 py-2 px-4 rounded-lg bg-InactiveLightActive items-center">
                            <Text className="text-black text-xs font-normal mr-4">+62</Text>
                            <TextInput
                                placeholder="phone number"
                                style={{padding: 0}}
                                value={inputText.input.personalPhoneNumber}
                                onChangeText={(text) => inputText.handleInputChange('personalPhoneNumber', text)}
                                keyboardType="numeric"
                                className="text-black"
                            />
                        </View>
                        <Text className="text-textHitam text-xs font-semibold mt-2">Address</Text>
                        <TextInput 
                            multiline
                            placeholder="type your address"
                            textAlignVertical="top"
                            value={inputText.input.personalAddress}
                            onChangeText={(text) => inputText.handleInputChange('personalAddress', text)}
                            maxLength={100}
                            style={{
                                borderRadius:8,
                                backgroundColor: '#F3F3F3',
                                alignItems: 'flex-start',
                                height: 139,
                                alignSelf: 'stretch',
                                paddingVertical: 8,
                                paddingHorizontal: 16,
                                marginTop:10,
                                color: 'black'
                            }}
                        />
                        <Text className="text-textHitam text-xs font-bold mt-6">Emergency Contact Information</Text>
                        <Text className="text-textHitam text-xs font-semibold mt-6">Name</Text>
                        <TextInput
                            placeholder="name"
                            style={{paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, backgroundColor: "#F3F3F3", marginTop:8, color: 'black'}}
                            value={inputText.input.emerName}
                            onChangeText={(text) => inputText.handleInputChange('emerName', text)}
                        />
                        <Text className="text-textHitam text-xs font-semibold mt-6">Phone Number</Text>
                        <View className="flex-row mt-2 py-2 px-4 rounded-lg bg-InactiveLightActive items-center">
                            <Text className="text-black text-xs font-normal mr-4">+62</Text>
                            <TextInput
                                placeholder="phone number"
                                style={{padding: 0, color: "black"}}
                                value={inputText.input.emerPhoneNumber}
                                onChangeText={(text) => inputText.handleInputChange('emerPhoneNumber', text)}
                                keyboardType="numeric"
                            />
                        </View>
                        <Text className="text-textHitam text-xs font-semibold mt-6">Relation</Text>
                        <View style={{zIndex:0}}>
                            <DropDownPicker 
                                open={dropdown.openRelationType}
                                value={dropdown.value}
                                items={dropdown.items}
                                setOpen={dropdown.setopenRelationType}
                                setValue={dropdown.setValue}
                                placeholder="Relation"
                                containerStyle={{
                                    marginTop:10,
                                    marginBottom:24
                                }}
                                dropDownContainerStyle={{
                                    backgroundColor: 'white',
                                    borderRadius:8,
                                    marginTop:8
                                }}
                                className={`flex-1 bg-InactiveLightActive rounded-lg h-10 border-0`}
                                />
                        </View>
                        {
                            dropdownNew.newContact ?
                            <>
                            <Text className="text-textHitam text-xs font-bold mt-9">New Emergency Contact Information</Text>
                            <Text className="text-textHitam text-xs font-semibold mt-6">Name</Text>
                            <TextInput
                                placeholder="name"
                                style={{paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, backgroundColor: "#F3F3F3", marginTop:8, color: "black"}}
                                value={inputText.input.newName}
                                onChangeText={(text) => inputText.handleInputChange('newName', text)}
                            />
                            <Text className="text-textHitam text-xs font-semibold mt-6">Phone Number</Text>
                            <View className="flex-row mt-2 py-2 px-4 rounded-lg bg-InactiveLightActive items-center">
                                <Text className="text-black text-xs font-normal mr-4">+62</Text>
                                <TextInput
                                    placeholder="phone number"
                                    style={{padding: 0, color:"black"}}
                                    value={inputText.input.newPhoneNumber}
                                    onChangeText={(text) => inputText.handleInputChange('newPhoneNumber', text)}
                                    keyboardType="numeric"
                                />
                            </View>
                            <Text className="text-textHitam text-xs font-semibold mt-6">Relation</Text>
                            <View style={{zIndex:0}}>
                                <DropDownPicker 
                                    open={dropdownNew.openNewType}
                                    value={dropdownNew.valueNew}
                                    items={dropdownNew.itemsNew}
                                    setOpen={dropdownNew.setopenNewType}
                                    setValue={dropdownNew.setValueNew}
                                    placeholder="Relation"
                                    containerStyle={{
                                        marginTop:10,
                                        marginBottom:24
                                    }}
                                    dropDownContainerStyle={{
                                        backgroundColor: 'white',
                                        borderRadius:8,
                                        marginTop:8
                                    }}
                                    className={`flex-1 bg-InactiveLightActive rounded-lg h-10 border-0`}
                                />
                            </View>
                            </>
                            :
                            <Pressable className="flex-row py-2 px-4 items-center justify-between bg-InactiveLightActive mt-2" onPress={() => dropdownNew.setNewContact(!dropdownNew.newContact)}>
                                <Text className="text-black text-xs font-normal">Add new contact</Text>
                                <Image source={PlusIcon} style={{width:12, height:12}}/>
                            </Pressable>
                        }
                        <Pressable className="py-2 px-4 bg-SuccessNormal rounded-md items-center mt-6" onPress={handleSaveButton}>
                            <Text className="text-white text-base font-normal">Save</Text>
                        </Pressable>
                    </View>
                )}
            />
            <BottomSheetModal
                ref={bottomSheet.bottomSheetError}
                index={1}
                snapPoints={bottomSheet.snapPoints}
                backdropComponent={bottomSheet.renderBackdrop}
                className="rounded-2xl bg-white"
            >
                <View className="items-center px-8 ">
                    <Pressable className="absolute right-2 top-1" onPress={bottomSheet.handleBottomSheetErrorDismiss}>
                        <Image source={CloseIcon}/>
                    </Pressable>
                    <Image source={ErrorIcon} style={{width:60, height:60}}/>
                    <Text className="text-black font-semibold text-xl">Error</Text>
                    <Text className="text-black font-medium text-xs text-center mt-4">{bottomSheet.errorMessage}</Text>
                </View>
            </BottomSheetModal>
        </View>
    )
}

export default EditProfileView