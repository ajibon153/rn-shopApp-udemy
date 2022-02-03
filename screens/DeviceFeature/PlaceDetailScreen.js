import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import MapPreview from '../../components/Device/MapPreview';
import { useSelector } from 'react-redux';

import Colors from '../../constants/Colors';

const PlaceDetailScreen = (props) => {
  const [selectedPlace, setSelectedPlace] = React.useState(null);
  const placeId = props.route.params.id;

  // useEffect(() => {
  //   function searchPlace() {
  //     try {

  // console.log('props', props);
  // const placeId = props.route.params('placeId');
  // console.log('placeId', placeId);
  const selectPlace = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );
  // console.log('selectPlace', selectPlace);
  const selectedLocation = {
    pickedLocation: {
      latitude: selectPlace.latitude,
      longitude: selectPlace.longitude
        ? selectPlace.longitude
        : selectPlace.lngitude,
    },
  };

  const showMapHandler = () => {
    props.navigation.navigate('Map', {
      readonly: true,
      initialLocation: selectedLocation.pickedLocation,
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image source={{ uri: selectPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectPlace.title}</Text>
          <Text style={styles.address}>{selectPlace.address}</Text>
        </View>
        <MapPreview style={styles.mapPreview} location={selectedLocation} />
        <Button title='See location' onPress={showMapHandler} />
      </View>
    </ScrollView>
  );
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc',
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    // alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: 'center',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    // marginBottom: 20,
    // height: 300,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
  },
});
