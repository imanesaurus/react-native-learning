import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Colors from '../colors';
import {scrWidth, scrHeight} from '../screenSize';

const HIGH_DEVICES = scrWidth > 360;

const smallListCourses = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onSelect}>
      <View
        style={{
          ...styles.mainWrapper,
          ...props.itemstyle,
          width: props.widthSize,
          backgroundColor: 'white',
          flex: 1,
        }}>
        <View>
          <Image
            source={{uri: props.images}}
            style={{width: 70, height: 70, borderRadius: 5}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{marginLeft: 10, width: '80%'}}>
            <Text numberOfLines={1} style={{}}>
              {props.title}
            </Text>
            <Text style={{color: Colors.AccentColor, fontWeight: 'bold'}}>
              {props.category}{' '}
            </Text>
            {/* <View style={styles.courseCardButton}>
          <Text style={{color: 'white'}}>More Details</Text>
        </View> */}
            <Text style={{fontSize: 12, fontWeight: '400'}}>
              1 of {props.totalLesson} Lessons
            </Text>
          </View>
          {props.addicon && (
            <TouchableNativeFeedback onPress={props.buttonPress}>
              <View
                style={{
                  width: HIGH_DEVICES ? 40 : 35,
                  height: HIGH_DEVICES ? 40 : 35,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.AccentColor,
                  padding: 5,
                  marginRight: 10,
                }}>
                {props.playicon ? (
                  <Image
                    style={{width: '90%', height: '90%', tintColor: 'white'}}
                    source={require('../../assets/icons/play.png')}
                  />
                ) : (
                  <Image
                    style={{width: '90%', height: '90%', tintColor: 'white'}}
                    source={require('../../assets/icons/trash.png')}
                  />
                )}
              </View>
            </TouchableNativeFeedback>
          )}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
});

export default smallListCourses;
