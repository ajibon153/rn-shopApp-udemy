import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
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

  useEffect(() => {
    function searchPlace() {
      try {
        console.log('props', props);
        // const placeId = props.route.params('placeId');
        console.log('placeId', placeId);
        const selectPlace = useSelector((state) => state.places);
        console.log('selectPlace', selectPlace);
        // if (selectPlace) setSelectedPlace(selectPlace);
      } catch (error) {
        console.log(error);
        Alert.alert('Not Found!');
        props.navigation.goBack();
      }
    }
    searchPlace();
  }, []);

  if (!selectedPlace)
    return (
      <View style={styles.screen}>
        <ActivityIndicator
          size={'large'}
          color={Colors.primary}
        ></ActivityIndicator>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>PlaceDetailScreen</Text>
        </View>
        <MapPreview
          location={{
            latitude: selectedPlace.latitude,
            longitude: selectedPlace.longitude,
          }}
        />
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
    alignItems: 'center',
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
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
