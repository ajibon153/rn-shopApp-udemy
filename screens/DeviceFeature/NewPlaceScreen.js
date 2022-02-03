import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import ImagePicker from '../../components/Device/ImagePicker';

import { useDispatch } from 'react-redux';
import * as placeAction from '../../store/actions/PlaceAction';
import LocationPicker from '../../components/Device/LocationPicker';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import Colors from '../../constants/Colors';

const NewPlaceScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const [titleValue, setTitleValue] = React.useState('');
  const [SelectedImage, setSelectedImage] = React.useState('');
  const [IsFetching, setIsFetching] = React.useState(false);
  const [PickLocation, setPickLocation] = React.useState(null);
  const mapPickedLocation = props.route.params;

  const titleChangedHandler = (text) => {
    setTitleValue(text);
  };

  const imageTakenHandler = (imgPath) => {
    setSelectedImage(imgPath);
    getLocationHandler();
  };

  const getLocationHandler = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    console.log('result', result);
    console.log('props', props);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permission to use this app'
      ),
        [{ text: 'Okay' }];
      return false;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      console.log('location', location);
      let mapLocation = {
        pickedLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      };
      // setPickLocation(mapLocation);
      locationPickedHandler(mapLocation);
    } catch (error) {
      console.log('getLocationHandler Error ===', error);
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  const locationPickedHandler = useCallback(
    (location) => {
      console.log('locationPickedHandler', location);
      setPickLocation(location);
    },
    [props]
  );

  const savePlaceHandler = () => {
    //console.log('savePlaceHandler');
    if (titleValue !== '' && SelectedImage !== '') {
      dispatch(placeAction.addPlace(titleValue, SelectedImage, PickLocation));
      navigation.goBack();
    } else {
      Alert.alert('Fill data corectly.');
    }
  };

  useEffect(() => {
    console.log('NewPlaceScreen', mapPickedLocation);
    if (mapPickedLocation) {
      // setPickLocation(mapPickedLocation);
      locationPickedHandler(mapPickedLocation);
    }
  }, [props]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Login',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Menu'
            iconName={'ios-arrow-back'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Nama User</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangedHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          PickLocation={PickLocation}
          onLocationPicked={locationPickedHandler}
          IsFetching={IsFetching}
          setIsFetching={setIsFetching}
          getLocationHandler={getLocationHandler}
        />
        <Button
          title='Save Place'
          style={styles.button}
          color={Colors.secondary}
          onPress={() => savePlaceHandler()}
        />
      </View>
    </ScrollView>
  );
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  button: {
    marginTop: 10,
    paddingTop: 10,
  },
});
