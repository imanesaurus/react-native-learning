import React, {Component, useState} from 'react';
import {View, Image, StyleSheet, Text, CheckBox} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const StarRating = () => {
  const [rating, setRating] = useState(null);

  return (
    <View style={styles.rating}>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        setRating(ratingValue);

        return (
          <TouchableOpacity onPress={ratingValue}>
            <Image
              style={styles.image}
              source={require('../assets/icons/star.png')}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width: 10,
    // height: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
});
export default StarRating;
