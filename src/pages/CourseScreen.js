import React, {
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import {AirbnbRating, Overlay} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  addWIshlist,
  rateCourse,
  takenCourse,
  unEnrollCourse,
} from '../../store/actions/courses';
import * as RatingsAction from '../../store/actions/ratings';
import CustomBadge from '../components/Badge';
import ButtonTemplate from '../components/buttonTemplate';
import Colors from '../components/colors';
import HeaderButton from '../components/HeaderButton';
import {scrHeight, scrWidth} from '../components/screenSize';
import Header from '../components/Header';

const HIGH_DEVICES = scrWidth > 360;
const CourseScreen = (props) => {
  const [crating, setcRating] = useState(0);
  const [creview, setcReview] = useState(0);
  const [modalVisible, setModalVIsible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const WISHLIST_SCR = 'WishlistScr';
  const availableCourses = useSelector((state) => state.courses.courses);
  const wishCourse = useSelector((state) => state.courses.whishlistCourses);
  const takenCourses = useSelector((state) => state.courses.takenCourse);
  const rated = useSelector((state) => state.rating.ratings);
  const avgRated = rated.length/4;
  const {navigation, route} = props;
  const userGuest = 'Guest';
  const {courseId, courseRating, courseTitle} = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  // const scrollY = new Animated.Value(0);

  const wishlistToggleHandler = () => {
    navigation.navigate(WISHLIST_SCR);
  };

  const currentCourseWishlist = useSelector((state) =>
    state.courses.whishlistCourses.some((course) => course.id === courseId),
  );
  const currentEnrolledCourse = useSelector((state) =>
    state.courses.takenCourse.some((course) => course.id === courseId),
  );

  const selectedCourse = availableCourses.find(
    (course) => course.id === courseId,
  );

  const dispatch = useDispatch();
  const toggleWishlstHandler = useCallback(() => {
    dispatch(addWIshlist(courseId));
  }, [dispatch, courseId]);

  const toggleTakenHandler = useCallback(() => {
    dispatch(takenCourse(courseId));
  }, [dispatch, courseId]);

  const unEnrollHandler = useCallback(() => {
    dispatch(unEnrollCourse(courseId));
  }, [dispatch, courseId]);

  const stateRatingHandler = (rating) => {
    const deRating = rating;
    // setcRating(() => x.value = deRating);
    setcRating(deRating);
    // dispatch(rateCourse(courseId, crating));
    // courseRatingHandler(crating);
  };

  const submitRating = () => {
    dispatch(RatingsAction.addRatings(courseId, userGuest, crating, creview));
    dispatch(rateCourse(courseId, crating ))
  };

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const onRefreshHandler = useCallback(() => {
    setRefreshing(true);
    dispatch(RatingsAction.fetchRatings(courseId, userGuest));
    // dispatch(RatingsAction.addCourseRating(courseId));
    wait(20).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* <Animated.View
        style={{
          elevation: 1,
          zIndex: 4,
            transform: [
              {
                translateY
              },
            ],

        }}> */}
      <Header
        title={courseTitle}
        onPressLeft={() => props.navigation.goBack()}
        onPressRight={wishlistToggleHandler}
        scrollY={scrollY}
      />
      {/* </Animated.View> */}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshHandler}
          />
        }
        // onScrollBeginDrag={(e) => {
        //   scrollY.setValue(e.nativeEvent.contentOffset.y);
        // }}
        scrollEventThrottle={16}
        onScroll={(event) => {
          scrollY.setValue(event.nativeEvent.contentOffset.y);
        }}>
        <View style={styles.mainWrapper}>
          <View style={styles.ImageWrapper}>
            <ImageBackground
              style={styles.image}
              blurRadius={12}
              source={{uri: selectedCourse.images}}></ImageBackground>
            <View style={styles.backgroundStyle}></View>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'white']}
              style={{
                width: '100%',
                height: scrHeight * 0.3,
                position: 'absolute',
                bottom: 0,
              }}
            />
            <View style={styles.titleWrapper}>
              <Text numberOfLines={3} style={styles.textTitle}>
                {selectedCourse.title}{' '}
              </Text>
              <Text numberOfLines={2} style={styles.textSubtitle}>
                {selectedCourse.subtitle}{' '}
              </Text>
              <View style={styles.pinTextWrapper}>
                <Text
                  style={{
                    ...styles.textCategory,
                    backgroundColor: Colors.AccentColor,
                    color: 'white',
                  }}>
                  {selectedCourse.category}
                </Text>
                <Text
                  style={{
                    ...styles.textCategory,
                    backgroundColor: Colors.PrimaryColor,
                    color: 'black',
                  }}>
                  Created by: {selectedCourse.uid}
                </Text>
                <Text
                  style={{
                    ...styles.textCategory,
                    backgroundColor: 'transparent',
                    color: 'white',
                    borderWidth: 1,
                    borderColor: 'white',
                  }}>
                  {selectedCourse.totalLesson} Lessons
                </Text>
                {currentEnrolledCourse ? (
                  <Text
                    style={{
                      ...styles.textCategory,
                      backgroundColor: 'transparent',
                      color: 'white',
                      borderWidth: 1,
                      borderColor: 'white',
                    }}>
                    1 Users Enrolled
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
          <View style={styles.previewThumb}>
            <Image
              source={{uri: selectedCourse.images}}
              style={styles.smallpreview}
            />
          </View>
          <View
            style={{
              marginTop: HIGH_DEVICES ? 120 : 100,
              marginHorizontal: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 33}}>Rp.{selectedCourse.price} </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVIsible(!modalVisible);
              }}>
              <AirbnbRating
                isDisabled={true}
                defaultRating={selectedCourse.rating}
                // startingValue={selectedCourse.category}
                readonly={true}
                showRating={false}
                // onStartRating={stateRatingHandler}
                // onFinishRating={stateRatingHandler}
                onFinishRating={null}
                onPress={null}
                size={HIGH_DEVICES ? 40 : 30}
                starStyle={{marginVertical: 10}}
              />

              <Overlay
                hardwareAccelerated
                animationType="fade"
                overlayStyle={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0)',
                  justifyContent: 'flex-end',
                  width: scrWidth,
                }}
                animationType="slide"
                isVisible={modalVisible}
                onBackdropPress={() => {
                  setModalVIsible(false);
                }}>
                <View style={{backgroundColor: 'rgba(0,0,0,0.0)'}}>
                  <View style={styles.modalContainer}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 20,
                        alignSelf: 'center',
                        marginBottom: 10,
                      }}>
                      Please rate this Course
                    </Text>
                    <AirbnbRating
                      showRating={false}
                      defaultRating={selectedCourse.rating}
                      // imageSize={30}
                      size={HIGH_DEVICES ? 40 : 30}
                      style={{marginVertical: 5}}
                      // startingValue={selectedCourse.rating}
                      onFinishRating={stateRatingHandler}
                    />
                    <View style={{marginTop: 20}}>
                      <TextInput
                      onChangeText={(text) => {setcReview(text)}}
                        value={creview}
                        multiline={true}
                        textAlignVertical="top"
                        style={{
                          width: HIGH_DEVICES ? 350 : 300,
                          height: 150,
                          borderWidth: 1,
                          borderRadius: 10,
                          borderColor: 'gray',
                          marginBottom: 20,
                        }}
                      />
                      <ButtonTemplate
                        title="Submit"
                        textColor="white"
                        bgcolor={Colors.AccentColor}
                        buttonSty={{marginBottom: 10}}
                        onPress={submitRating}
                      />
                      <ButtonTemplate
                        title="Close"
                        type="clear"
                        textColor={Colors.TextColor}
                        onPress={() => {
                          setModalVIsible(false);
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Overlay>
            </TouchableOpacity>
            {!currentEnrolledCourse ? (
              <ButtonTemplate
                onPress={() => {
                  Alert.alert(
                    'Enroll Course',
                    'Do You really want to enrolled to this course?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'Yes, please', onPress: toggleTakenHandler},
                    ],
                    {cancelable: false},
                  );
                }}
                title="Take this Course"
                textColor="white"
                bgcolor={Colors.AccentColor}
                widthstyle={HIGH_DEVICES ? scrWidth * 0.7 : scrWidth * 0.85}
                buttonSty={{marginTop: 5, width: 200}}
              />
            ) : (
              <ButtonTemplate
                onPress={() => {
                  Alert.alert(
                    'Enroll Course',
                    'Do You really want to unenroll from this course?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                      },
                      {text: 'Yes', onPress: unEnrollHandler},
                    ],
                    {cancelable: false},
                  );
                }}
                title="Unenroll"
                textColor="white"
                bgcolor={Colors.AccentColor}
                widthstyle={HIGH_DEVICES ? scrWidth * 0.7 : scrWidth * 0.85}
                buttonSty={{marginTop: 5}}
              />
            )}
            <ButtonTemplate
              title={currentCourseWishlist ? 'Wishlisted' : 'Add To Whishlist'}
              textColor={currentCourseWishlist ? 'black' : Colors.AccentColor}
              bgcolor={currentCourseWishlist ? Colors.PrimaryColor : 'white'}
              type="clear"
              widthstyle={HIGH_DEVICES ? scrWidth * 0.7 : scrWidth * 0.85}
              buttonSty={{marginTop: 10, elevation: 2}}
              onPress={toggleWishlstHandler}
            />
          </View>
          <View style={styles.descriptionWrapper}>
            <Text style={{fontSize: 30}}>Description</Text>
            <Text style={styles.description}>
              {selectedCourse.description}{' '}
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* <Animated.View
        style={{
          elevation: 1,
          zIndex: 4,
          useNativeDriver: true,
          transform: [
            {
              translateY,
            },
          ],
        }}>
        <Header
          title={courseTitle}
          onPressLeft={() => props.navigation.goBack()}
          onPressRight={wishlistToggleHandler}
          scrollY={scrollY}
        />
      </Animated.View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: 'white',
  },
  backgroundStyle: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.4,
    top: 0,
    left: 0,
  },
  ImageWrapper: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: scrHeight * 0.6,
    paddingBottom: 10,
    position: 'relative',
  },
  titleWrapper: {
    borderColor: 'white',
    marginTop: 50,
    marginHorizontal: 40,
    width: scrWidth * 0.8,
    height: scrHeight * 0.35,
    position: 'absolute',
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
  },
  textSubtitle: {
    fontSize: 20,
    color: 'white',
  },
  pinTextWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textCategory: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: HIGH_DEVICES ? 10 : 5,
    marginTop: HIGH_DEVICES ? 10 : 5,
    fontSize: HIGH_DEVICES ? null : 12,
  },
  previewThumb: {
    width: scrWidth * 0.7,
    height: scrHeight * 0.25,
    position: 'absolute',
    top: 300,
    // bottom: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  smallpreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  descriptionWrapper: {
    marginTop: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
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
  description: {
    textAlign: 'justify',
    padding: 5,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: HIGH_DEVICES ? 100 : 50,
    marginBottom: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
export default CourseScreen;
