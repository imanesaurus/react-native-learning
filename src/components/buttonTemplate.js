import React, {Component} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {scrWidth} from '../components/screenSize';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const buttonTemplate = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          ...styles.defaultStyle,
          ...props.buttonSty,
          width: props.widthstyle,
          backgroundColor: props.bgcolor,
        }}>
        <Text style={{color: props.textColor, fontSize: props.textSize}}>
          {props.title}
        </Text>
        {/* <Button
          {...props}
          raised
          onPress={props.onPress}
          type={props.type}
          title={props.title}
          titleStyle={{color: props.textColor, fontSize: props.textSize}}
          buttonStyle={{
            //   width: props.widthstyle,
            backgroundColor: props.bgcolor,
            // backgroundColor: 'gold',
          }}
        /> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    justifyContent: 'center',
    // overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 1,
  },
});

export default buttonTemplate;
