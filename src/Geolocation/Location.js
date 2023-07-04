import Geolocation from 'react-native-geolocation-service'
import {PermissionsAndroid} from 'react-native'

// Function to get permission for location
const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission for Clock In',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  }

export const getLocation = async () => {
  const result = await requestLocationPermission()
  if (result) {
    return new Promise((resolve, reject) => {

      Geolocation.getCurrentPosition(
        resolve,
        reject,
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      )
    })
  }
}