import React from 'react';
import {Image} from 'react-native';
import {Platform} from 'react-native';

import Colors from '../components/colors';

const CustomHeaderButton = (props) => {
  return (
    <Image
      style={{
        width: 30,
        height: 30,
        tintColor: props.color,
      }}
      source={props.image}
    />
  );
};

export default CustomHeaderButton;
