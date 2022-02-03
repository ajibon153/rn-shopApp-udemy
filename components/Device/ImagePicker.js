import { Image, StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ImagePickerComp = (props) => {
  const [pickedImage, setPickedImage] = React.useState(null);

  const takeImageHandler = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    //console.log('result', result);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permission to use this app'
      ),
        [{ text: 'Okay' }];
      return false;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    //console.log('image', image);
    if (!image.cancelled) setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage && <Text>No Image Picked yet</Text>}
        <Image style={styles.image} source={{ uri: pickedImage }} />
      </View>
      <Button
        title='Take Image'
        color={Colors.secondary}
        onPress={takeImageHandler}
        style={styles.button}
      />
    </View>
  );
};

export default ImagePickerComp;

const styles = StyleSheet.create({
  imagePicker: {
    position: 'relative',
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
    marginVertical: 15,
    marginBottom: 30,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // marginVertical: 20,
  },
  button: {
    width: '100%',
    marginBottom: 10,
  },
});
