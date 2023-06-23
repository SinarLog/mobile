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

export const getLocation = () => {
    const result = requestLocationPermission()
    result.then(res => {
      console.log('res is:', res)
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log('Position',position)
            return position
          },
          error => {
            // See error code charts below.
            console.log('Error Get Location',error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        )
      }
    })
}