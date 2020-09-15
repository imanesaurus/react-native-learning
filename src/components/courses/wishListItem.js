import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../colors';

const wishListItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.mainWrapper}>
        <View>
          <Image source={{uri: props.images}} style={styles.images} />
        </View>
        <View style={styles.textWrapper}>
          <View></View>
          <Text numberOfLines={2} style={{}}>
            {props.title}
          </Text>
          <Text style={styles.textCategory}>{props.category} </Text>
          {/* <View style={styles.courseCardButton}>
            <Text style={{color: 'white'}}>More Details</Text>
          </View> */}
          <Text style={styles.textTotalLesson}>
            1 of {props.totalLesson} Lessons
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    marginTop: 15,
    marginHorizontal: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  images: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textCategory: {
    color: Colors.AccentColor,
    fontWeight: 'bold',
  },
  textTotalLesson: {
    fontSize: 12,
    fontWeight: '400',
  },
});

export default wishListItem;
