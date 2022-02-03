import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/HeaderButton';

const MapScreen = (props) => {
  const { navigation } = props;
  const params = props.route.params;
  console.log('params', params);

  const initialLocation = params ? params.initialLocation : undefined;
  const readonly = params ? params.readonly : false;
  console.log('=================');
  console.log('initialLocation', initialLocation);
  console.log('readonly', readonly);
  const [SelectedLocation, setSelectedLocation] = React.useState(null);
  const [Step, setStep] = React.useState(0);

  const mapRegion = {
    latitude: readonly
      ? initialLocation
        ? initialLocation.latitude
        : -6.5544207
      : -6.5544207,
    longitude: readonly
      ? initialLocation
        ? initialLocation.longitude
        : 106.8532496
      : 106.8532496,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    let data = {
      latitude: Number(event.nativeEvent.coordinate.latitude),
      longitude: Number(event.nativeEvent.coordinate.longitude),
    };
    setSelectedLocation(data);
    setStep(1);
    // console.log('SelectedLocation 1', data);
  };

  const savePickedLocation = useCallback(() => {
    // console.log('SelectedLocation 3', SelectedLocation);
    setStep(2);
    navigation.navigate('NewPlace', { pickedLocation: SelectedLocation });
  }, [SelectedLocation, Step]);

  useEffect(() => {
    // console.log('SelectedLocation 4', SelectedLocation);
    if (SelectedLocation) {
      setStep(3);

      navigation.setParams({ saveLocation: savePickedLocation });
    }
  }, [SelectedLocation]);

  useLayoutEffect(() => {
    // const saveFn = navigation.getParam('saveLocation');
    // console.log('props.route', props.route.params);
    // console.log('SelectedLocation 0', SelectedLocation);

    const saveFn = props.route.params
      ? props.route.params.saveLocation
        ? props.route.params.saveLocation
        : null
      : null;
    // console.log('saveFn', saveFn);
    // setStep(0);
    navigation.setOptions({
      title: readonly ? 'Map Location' : 'Pick Place',
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
      headerRight: () => {
        if (saveFn && SelectedLocation) {
          return (
            <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
              <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
          );
        }
        if (!readonly)
          return (
            <View>
              <Text style={styles.headerButtonTextDis}>Save</Text>
            </View>
          );
      },
    });
  }, [navigation, SelectedLocation, Step]);

  // let markerCoorinates;
  // if (SelectedLocation) {
  // //console.log('selectLocationHandler 2', SelectedLocation);
  //   markerCoorinates = {
  //     latitude: SelectedLocation.latitude,
  //     langitude: SelectedLocation.langitude,
  //   };
  // }
  // console.log('===================');

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {(SelectedLocation || readonly) && (
        <Marker
          title='Picked Location'
          coordinate={{
            latitude: !readonly
              ? Number(SelectedLocation.latitude)
              : Number(initialLocation.latitude),
            longitude: !readonly
              ? Number(SelectedLocation.longitude)
              : Number(initialLocation.longitude),
          }}
        />
      )}
    </MapView>
  );
};

// SelectedLocation && Number(SelectedLocation.latitude)
//   ?
// Number(SelectedLocation.latitude)
// : 0,

// SelectedLocation && Number(SelectedLocation.longitude)
//   ?
//  Number(SelectedLocation.longitude)
// : 0,

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    // height: 200,
    // width: '100%',
  },
  headerButton: {
    marginHorizontal: 10,
  },
  headerButtonText: {
    fontSize: 16,
    color: 'white',
  },
  headerButtonTextDis: {
    fontSize: 16,
    color: 'gray',
  },
});
