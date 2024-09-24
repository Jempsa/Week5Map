import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react';
import Map from './screens/Map';
import { PaperProvider } from 'react-native-paper';
import MyApplicationbar from './components/MyApplicationbar';
import * as Location from 'expo-location';



const settings = {
  backGround: '00a484'
}

const icons = {
  location_not_know: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps'
}

export default function App() {
  const [icon, setIcon] = useState(icons.location_not_know);

  
  const [location, setLocation] = useState({
    latitude: 65.0800,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  const getUserPosition = async () => {
    setIcon(icons.location_searching);
    let { status } = await Location.requestForegroundPermissionsAsync();

    try {
      if (status !== 'granted') {
        console.log("Location not found");
        return;
      }

      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });

      setLocation({...location,latitude: position.coords.latitude,longitude: position.coords.longitude,});

      setIcon(icons.location_found); 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PaperProvider>
      <MyApplicationbar
        title="Map"
        backGroundColor={settings.backGround}
        icon={icon}
        getUserPosition={getUserPosition}
      />
      <Map location={location} />
    </PaperProvider>
  );
}

