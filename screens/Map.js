import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';



export default function Map({ location }) {
    const [markers, setMarkers] = useState([]);

    // Funktio uuden markkerin lisäämiseksi
    const addMarker = (e) => {
        const coords = e.nativeEvent.coordinate;
        setMarkers([...markers, coords]);
    }

    const removeMarker = (indexToRemove) => {
        setMarkers(markers.filter((marker, index) => index !== indexToRemove));
    }

    return (
        <SafeAreaView>
            <MapView
                style={styles.map}
                region={location}
                onLongPress={addMarker}
            >

                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        title={`Marker ${index + 1}`}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        onPress={() => removeMarker(index)} // Tässä voidaan painamalla poistaa markkeri
                    />
                ))}
            </MapView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'ff0000',
        alignItems: 'center',
        justifyContent: 'center',

    },
    map: {
        height: '100%',
        width: '100%',
    },
});
