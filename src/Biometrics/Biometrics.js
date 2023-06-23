const { default: ReactNativeBiometrics } = require("react-native-biometrics")

export const isBiometricSupport = async () => {
    try {
        const rnBiometrics = new ReactNativeBiometrics()
        
        const { available, biometryType } = await rnBiometrics.isSensorAvailable()
        
        if (available && biometryType === ReactNativeBiometrics.TouchID) {
            console.log('TouchID is supported', biometryType);
        } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
            console.log('FaceID is supported', biometryType);
        } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
            console.log('Biometrics is supported', biometryType);
        } else {
            console.log('Biometrics not supported');
        }

        const {success, error} = await ReactNativeBiometrics.simplePrompt({
            promptMessage: 'Sign in with Touch ID',
            cancelButtonText: 'Close',
        });
        console.log({success, error});

    } catch (error) {
        console.log('Error Biometrics', error);
    }
}