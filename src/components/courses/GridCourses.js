import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {scrWidth, scrHeight} from '../screenSize';
import Colors from '../colors';
import {Rating} from 'react-native-elements';
import {Card} from 'react-native-paper';

const LOW_DEVICES = scrWidth < 400;
const GridCourses = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.courseCard}>
        <View>
          <Image source={{uri: props.image}} style={styles.courseCardImage} />
        </View>
        <View style={styles.textWrapper}>
          <Text numberOfLines={1} style={styles.courseCardTitle}>
            {props.title}
          </Text>
          <Text style={{color: Colors.AccentColor, fontWeight: 'bold'}}>
            {props.category}
          </Text>
          <Rating
            readonly={true}
            type="star"
            ratingCount={5}
            imageSize={20}
            style={{alignItems: 'flex-start'}}
            startingValue={props.courserating}
          />
          <Text style={{fontSize: 23, fontWeight: '400'}}>
            Rp. {props.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  courseCard: {
    marginRight: 10,
    width: LOW_DEVICES ? scrWidth * 0.6 : scrWidth * 0.7,
    borderColor: Colors.TextColor,
    marginBottom: 10,
    paddingBottom: 15,
    elevation: 1,
  },
  courseCardImage: {
    width: '100%',
    height: scrHeight / 5,
    borderRadius: 5,
  },
  courseCardTitle: {
    marginTop: 5,
    fontSize: 18,
    // fontWeight: '400',
    color: Colors.TextColor,
  },
  textWrapper: {
    paddingLeft: 10,
  },
});

export default GridCourses;
