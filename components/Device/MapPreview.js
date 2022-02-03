import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ENV from '../../env';

import MapView, { Marker } from 'react-native-maps';

const MapPreview = (props) => {
  let imagePreviewUrl;
  console.log('MapPreview 1', props.location);
  let mapRegion;

  if (props.location) {
    let latitude = props.location.pickedLocation.latitude
      ? props.location.pickedLocation.latitude
      : 0;
    let longitude = props.location.pickedLocation.longitude
      ? props.location.pickedLocation.longitude
      : 0;
    // console.log('MapPreview 2', latitude, longitude);

    mapRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${latitude},${longitude}&key=${
      ENV().googleApiKey
    }`;
    // console.log('mapRegion', mapRegion);
  }

  // console.log('imagePreviewUrl', imagePreviewUrl);

  return (
    <View
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <View style={styles.wrapper}>
          <MapView
            style={styles.map}
            region={mapRegion}
            pitchEnabled={false}
            rotateEnabled={false}
            zoomEnabled={false}
            scrollEnabled={false}
            // pointerEvents='none'
            // onPress={selectLocationHandler}
          >
            {mapRegion && (
              <Marker
                title='Picked Location'
                coordinate={{
                  latitude: Number(mapRegion.latitude),
                  longitude: Number(mapRegion.longitude),
                }}
              />
            )}
          </MapView>
          {/* <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} /> */}
        </View>
      ) : (
        props.children
      )}
      {/* {props.location && (
        
      )} */}
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    top: 0,
    // height: 200,
    width: '100%',
  },
  map: {
    // flex: 1,
    top: 0,
    height: 200,
    width: '100%',
  },
});
{
  /*
        <View>
           <MapView
            style={styles.map}
            region={mapRegion}
            // onPress={selectLocationHandler}
          >
            {mapRegion && (
              <Marker
                title='Picked Location'
                coordinate={{
                  latitude: Number(mapRegion.latitude),
                  longitude: Number(mapRegion.longitude),
                }}
              />
            )}
          </MapView> 
        </View>
          */
}
