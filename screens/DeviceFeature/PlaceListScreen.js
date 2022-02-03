import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import React, { useLayoutEffect, useEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useSelector, useDispatch } from 'react-redux';
import * as placeAction from '../../store/actions/PlaceAction';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import PlaceItem from '../../components/Device/PlaceItem';

const PlaceListScreen = (props) => {
  const { navigation } = props;
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placeAction.loadPlaces());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'All Place',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Menu'
            iconName={'md-menu'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Add Place'
            iconName={'md-add'}
            onPress={() => navigation.navigate('NewPlace')}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          title={itemData.item.title}
          image={itemData.item.imageUri}
          address={itemData.item.address}
          onSelect={() => {
            navigation.navigate('PlaceDetail', {
              id: itemData.item.id,
              title: itemData.item.title,
            });
          }}
        />
      )}
    />
  );
};

export default PlaceListScreen;

const styles = StyleSheet.create({});
