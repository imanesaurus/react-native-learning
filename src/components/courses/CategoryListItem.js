import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {scrWidth, scrHeight} from '../screenSize';
import Colors from '../colors';

const CategoryList = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={{...styles.mainWrapper, ...props.style}}>
        <ImageBackground
          blurRadius={2}
          style={{width: '100%', flex: 1, paddingTop: 5}}
          source={{uri: props.image}}>
          
        </ImageBackground>
        <View style={styles.backgoundOver}></View>
        <View style={styles.titleWrapper}>
          <Text style={styles.Text}>{props.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    height: 60,
    elevation: 2,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  Text: {
    textAlign: 'left',
    color: 'white',
    fontSize: 25,
    marginLeft: 10,
  },
  backgoundOver: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.1,
    top: 0,
    left: 0,
  },
  titleWrapper: {
    marginTop: 40,
    marginHorizontal: 40,
    position: 'absolute',
  },
});

export default CategoryList;
