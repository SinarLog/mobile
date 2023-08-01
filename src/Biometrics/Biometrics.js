const { default: ReactNativeBiometrics } = require("react-native-biometrics")

export const isBiometricSupport = async () => {
    try {
        const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })
        
        const { available, biometryType } = await rnBiometrics.isSensorAvailable()

        if (available && biometryType ) {
            console.log('Biometrics is supported', biometryType);
            const {success, error} = await rnBiometrics.simplePrompt({
                promptMessage: 'Log in with Biometrics',
                cancelButtonText: 'Close',
            });
            return success
        } else {
            console.log('Biometrics not supported');
        }


    } catch (error) {
        console.log('Error Biometrics', error);
    }
}