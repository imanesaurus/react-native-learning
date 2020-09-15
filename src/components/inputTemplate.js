import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
import {scrWidth, scrHeight} from '../components/screenSize';

const inputTemplate = (props) => {
  return (
    <View>
      <TextInput
        {...props}
        placeholder={props.placeholderText}
        onChangeText={props.onChange}
        defaultValue={props.value}
        autoCapitalize="none"
        keyboardType={props.type}
        style={{
          borderWidth: 1,
          borderRadius: 20,
          marginBottom: 10,
          paddingLeft: 10,
          width: scrWidth * 0.6,
          height: props.heightSize
        }}
      />
    </View>
  );
};

export default inputTemplate;
