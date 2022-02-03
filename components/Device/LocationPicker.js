import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Colors from '../../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = (props) => {
  let {
    PickLocation,
    IsFetching,
    setIsFetching,
    onLocationPicked,
    getLocationHandler,
  } = props;
  // const mapPickedLocation = props;
  // const mapPickedLocation2 = props.navigation.getState().routes;

  useEffect(() => {
    // console.log('mapPickedLocation2', mapPickedLocation2);
    // console.log('mapPickedLocation', mapPickedLocation);
    // console.log('PickLocation', PickLocation);
    console.log('props', props);
    // if (mapPickedLocation) setPickLocation(mapPickedLocation);
    // if (mapPickedLocation2) {
    //   let find = mapPickedLocation2.find((item) => {
    //     console.log('item', item.name);
    //     if (item.name === 'NewPlace') return item.params;
    //   });
    //   console.log('find', find);
    //   if (find) setPickLocation(mapPickedLocation2);
    // }
  }, [props]);

  // const getLocationHandler = async () => {
  //   const result = await Permissions.askAsync(Permissions.LOCATION);
  //   console.log('result', result);
  //   console.log('props', props);
  //   if (result.status !== 'granted') {
  //     Alert.alert(
  //       'Insufficient permissions!',
  //       'You need to grant location permission to use this app'
  //     ),
  //       [{ text: 'Okay' }];
  //     return false;
  //   }
  //   try {
  //     setIsFetching(true);
  //     const location = await Location.getCurrentPositionAsync({
  //       timeout: 5000,
  //     });
  //     console.log('location', location);
  //     let mapLocation = {
  //       pickedLocation: {
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //       },
  //     };
  //     // setPickLocation(mapLocation);
  //     onLocationPicked(mapLocation);
  //   } catch (error) {
  //     console.log('getLocationHandler Error ===', error);
  //     Alert.alert(
  //       'Could not fetch location!',
  //       'Please try again later or pick a location on the map.',
  //       [{ text: 'Okay' }]
  //     );
  //   }
  //   setIsFetching(false);
  // };

  const pickOnMapHandler = () => {
    //console.log('pickOnMapHandler');
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.location}>
      <MapPreview
        style={styles.mapPreview}
        location={PickLocation}
        onPress={pickOnMapHandler}
      >
        {IsFetching ? (
          <ActivityIndicator size='large' color={Colors.secondary} />
        ) : (
          <Text>{/* No location chosen yet! */}</Text>
        )}
      </MapPreview>
      {/* <View style={styles.actions}>
        <Button title='Get User Location' onPress={getLocationHandler} />
        <Button title='Pick on Map' onPress={pickOnMapHandler} />
      </View> */}
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  location: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
