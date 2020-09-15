import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Colors from '../colors';
import {scrWidth, scrHeight} from '../screenSize';
import {Rating} from 'react-native-elements';

const CategoryList = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.mainWrapper}>
        <View>
          <ImageBackground
            source={{uri: props.image}}
            style={styles.courseCardImage}>
            <Text
              style={{
                ...styles.textCategory,
                ...styles.textImage,
              }}>
              {props.category}
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.textWrapper}>
          <Text numberOfLines={2} style={styles.courseCardTitle}>
            {props.title}
          </Text>
          <Text
            style={{
              ...styles.textCategory,
              backgroundColor: Colors.PrimaryColor,
              color: Colors.TextColor,
              borderRadius: 10,
              fontSize: 13,
              alignSelf: 'center'
            }}>
            Created by : {props.uid}
          </Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={20}
            style={styles.rating}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={styles.Price}>Rp. {props.price}</Text>
            <TouchableOpacity onPress={props.buttonPress}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.AccentColor,
                  padding: 5,
                  marginRight: 10,
                  elevation: 2,
                }}>
                <Image
                  style={{width: '90%', height: '90%', tintColor: 'white'}}
                  source={require('../../assets/icons/heartbeat.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    borderRadius: 5,
    marginHorizontal: 10,
    elevation: 2,
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    marginTop: 10,
    overflow: 'hidden',
  },
  courseCardImage: {
    width: '100%',
    height: scrHeight / 4,
    borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  courseCardTitle: {
    fontSize: 25,
    textAlign: 'center',
  },
  textWrapper: {
    flex: 1,
  },
  textCategory: {
    fontSize: 18,
    fontWeight: '400',
    paddingVertical: 2,
    paddingHorizontal: 10,
    color: 'white',
  },
  rating: {
    alignItems: 'flex-start',
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    alignSelf: 'center'
  },
  textImage: {
    backgroundColor: Colors.AccentColor,
    marginTop: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  Price: {
    fontSize: 25,
    paddingVertical: 2,
    borderColor: Colors.TextColor,
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
export default CategoryList;
