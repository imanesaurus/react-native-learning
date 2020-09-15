import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import CustomBadge from './Badge';
import Colors from './colors';
import {scrHeight} from './screenSize';

const HEADER_HEIGHT = scrHeight * 0.09;

const Header = (props) => {
  const wishCourse = useSelector((state) => state.courses.whishlistCourses);
  const {scrollY} = props;
  const [isTransparent, setTransparent] = useState(true);

  const listenerId = scrollY.addListener((y) => {
    if (isTransparent && y.value > HEADER_HEIGHT) {
      setTransparent(false);
    } else if (!isTransparent && y.value < HEADER_HEIGHT) {
      setTransparent(true);
    }
    return () => scrollY.removeListener(listenerId);
  });

  // const scrollY = new Animated.Value(0);

  const textHeaderScroll = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT * 2 + 5],
    outputRange: [-40, 0],
    extrapolate: 'clamp',
  });
  const textHeaderScroll2 = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT, HEADER_HEIGHT * 4],
    outputRange: [-40, 0],
    extrapolate: 'clamp',
  });
  const backgroundChange = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 3, HEADER_HEIGHT + 5],
    outputRange: ['transparent', 'transparent', Colors.PrimaryColor],
    extrapolate: 'clamp',
  });

  // const backgroundColorChange = () => {
  //   if (isTransparent && scrollY.value > HEADER_HEIGHT) {
  //     setTransparent(false);
  //   } else if (!isTransparent && scrollY.value < HEADER_HEIGHT){
  //     setTransparent(true);
  //   }
  // };

  return (
    <Animated.View style={styles.container(isTransparent, backgroundChange)}>
      <TouchableOpacity onPress={props.onPressLeft}>
        <Image
          style={{
            width: 20,
            height: 20,
            tintColor: isTransparent ? 'white' : Colors.TextColor,
          }}
          source={require('../assets/icons/back.png')}
        />
      </TouchableOpacity>
      {/* {isTransparent ? null : ( */}
      <View
        style={{
          marginRight: 20,
          marginLeft: 10,
        }}>
        <Animated.Text
        numberOfLines={3}
          style={{

            display: isTransparent ? 'none' : null,
            bottom: textHeaderScroll,
            // top:0,
            fontSize: 15,
            flexWrap: 'wrap',
          }}>
          {props.title}
        </Animated.Text>
      </View>
      {/* )} */}
      <TouchableOpacity onPress={props.onPressRight}>
        <View>
          <Image
            style={{
              width: 30,
              height: 30,
              tintColor: isTransparent ? 'white' : Colors.TextColor,
            }}
            source={require('../assets/icons/heartbeat.png')}></Image>
          {wishCourse.length > 0 && <CustomBadge />}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: (isTransparent, backgroundChange) => ({
    height: HEADER_HEIGHT + 10,
    width: '100%',
    // backgroundColor: isTransparent ? 'transparent' : Colors.PrimaryColor,
    backgroundColor: backgroundChange,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    overFlow: 'hidden',
  }),
  text: {
    paddingHorizontal: 10,
    fontSize: 20,
    color: Colors.TextColor,
  },
});
