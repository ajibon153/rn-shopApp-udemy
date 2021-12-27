import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const CustomHeaderButton = (props) => {
//console.log('CustomHeaderButton',props)
//console.log('Colors',Colors)
//console.log('Ionicons',Ionicons)
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS==='android'?'white':Colors.primary}
      // color='white'
    />
  );
};

export default CustomHeaderButton;