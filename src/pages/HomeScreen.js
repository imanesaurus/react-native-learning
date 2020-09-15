import React, {useCallback, useEffect, useState, useLayoutEffect} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, ProgressBar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as SeenAction from '../../store/actions/courses';
import CustomBadge from '../components/Badge';
import ButtonTemplate from '../components/buttonTemplate';
import Colors from '../components/colors';
import CourseItem from '../components/courses/GridCourses';
import SmallListCourseItem from '../components/courses/SmallListItem';
import {scrHeight, scrWidth} from '../components/screenSize';
import { Animated } from 'react-native';

const PADDING_DEVICES_HOR = scrWidth * 0.05;
const LOW_DEVICES = scrWidth > 360;
// const grad = <LinearGradient colors={[Colors.AccentColor, Colors.PrimaryColor]} />

const HomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState();
  const [tabBotPos, setTabBotPos] = useState();
  const COURSE_SCR = 'CourseScr';
  const WISHLIST_SCR = 'WishlistScr';
  const BROWSE_SCR = 'Browse';
  const {navigation, route, posisi} = props;
  const {userGuest, tabPos} = route.params;
  const scrollY = new Animated.Value(0);
  // const isloaded = setIsLoading(true);
  // const {courseId} = route.params;
  const availableCourse = useSelector((state) => state.courses.courses);
  const wishCourse = useSelector((state) => state.courses.whishlistCourses);
  const lastSeenCourses = useSelector((state) => state.courses.lastSeenCourse);
  const takenCourses = useSelector((state) => state.courses.takenCourse);
  const dispatch = useDispatch();

  const loadCourses = useCallback(async () => {
    setError(null);
    try {
      await dispatch(SeenAction.fetchCourses());
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setError]);

  const tabBarScroll = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [-40, 0],
    extrapolate: 'clamp',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'kiki'
    })
    // navigation.setParams({
    //   userGuest: 'Kiki',
    //   tabPos: 0,
    // })
  }, [navigation])

  useEffect(() => {
    setIsLoading(true);
    loadCourses().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadCourses, setIsLoading]);
  console.log(error);

  const selectCourseHandler = useCallback(
    async (id, title, rating) => {
      props.navigation.navigate(COURSE_SCR, {
        courseId: id,
        courseTitle: title,
        courseRating: rating,
      });
      await dispatch(SeenAction.lastSeen(id));
    },
    [navigation, lastSeenCourses],
  );
  // const takenCourseHandler = useCallback(
  //   async (id) => {
  //     props.navigation.navigate(COURSE_SCR, {
  //       courseId: id,
  //       courseTitle: title,
  //       courseRating: rating,
  //     });
  //     await dispatch(SeenAction.takenCourse(id));
  //   },
  //   [navigation],
  // );

  // const LastSeenHandler = useCallback((id) => {
  //   dispatch(SeenAction.lastSeen(id));
  // }, [dispatch, SeenAction.lastSeen, ])

  const wishlistToggleHandler = () => {
    setIsLoading(!isLoading);
    props.navigation.navigate(WISHLIST_SCR);
    setIsLoading(false);
  };

  const searchToogleHandler = () => {
    props.navigation.navigate(BROWSE_SCR);
  };

  if (isLoading) {
    return (
      <Modal hardwareAccelerated={true} visible={true}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            color={Colors.AccentColor}
            size={'small'}
            style={{position: 'absolute'}}
          />
          {/* <CustomLoader /> */}
        </View>
      </Modal>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            loadCourses();
            setTimeout(() => {
              setRefreshing(false);
            }, 1000);
          }}
        />
      }
      onScroll={(event) => {
        scrollY.setValue(event.nativeEvent.contentOffset.y);
      }}
      showsHorizontalScrollIndicator={false}
      style={styles.mainWrapper}>
      <View>
        <View style={styles.HeaderWrapper}>
          <View style={styles.upperCard}>
            <View style={styles.maincard}>
              <Image
                style={styles.imagecard}
                source={require('../assets/icons/profile.png')}
              />
            </View>
            <View style={styles.textCard}>
              <Text numberOfLines={2} style={styles.name}>
                Welcome : {userGuest}
              </Text>
              <Text
                numberOfLines={2}
                style={{...styles.name, fontSize: 10, color: 'gray'}}>
                Company name
              </Text>
            </View>
          </View>
          <View
            style={{justifyContent: 'space-evenly', height: scrHeight * 0.15}}>
            <TouchableOpacity onPress={wishlistToggleHandler}>
              <View style={styles.headerIconsty}>
                <Image
                  style={styles.headerIconImageSty}
                  resizeMode="cover"
                  source={require('../assets/icons/heartbeat.png')}
                />
                {wishCourse.length > 0 && <CustomBadge />}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={searchToogleHandler}>
              <View style={styles.headerIconsty}>
                <Image
                  style={styles.headerIconImageSty}
                  resizeMode="cover"
                  source={require('../assets/icons/loupe.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomWrapper}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginHorizontal: PADDING_DEVICES_HOR,
            marginTop: 10,
          }}>
          <View style={styles.upperCardText}>
            <Text style={{fontSize: 25, color: Colors.AccentColor}}>
              {takenCourses.length}
            </Text>
            <Text style={{fontSize: 11, color: Colors.TextColor}}>
              Courses To Do
            </Text>
          </View>
          <View style={styles.upperCardText}>
            <Text style={{fontSize: 25, color: Colors.AccentColor}}>
              {takenCourses.length}
            </Text>
            <Text style={{fontSize: 11, color: Colors.TextColor}}>
              Courses On Progress
            </Text>
          </View>
          <View style={styles.upperCardText}>
            <Text style={{fontSize: 25, color: Colors.AccentColor}}>0</Text>
            <Text style={{fontSize: 11, color: Colors.TextColor}}>
              Courses Completed
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginHorizontal: PADDING_DEVICES_HOR,
            marginTop: 10,
          }}>
          <View
            style={{
              ...styles.upperCardText2,
              backgroundColor: '#fcf2bb',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Image
                style={styles.headerIconImageLeadCert}
                resizeMode="cover"
                source={require('../assets/icons/leader.png')}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('LeaderboardScr')}>
                <Text
                  style={{
                    fontSize: LOW_DEVICES ? 20 : 16,
                    color: Colors.TextColor,
                  }}>
                  Leaderboards
                </Text>
                <Text style={{fontSize: 10, color: 'gray'}}>
                  Your Achievements
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              ...styles.upperCardText2,
              backgroundColor: '#947e07',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Image
                style={{...styles.headerIconImageLeadCert, tintColor: 'white'}}
                resizeMode="cover"
                source={require('../assets/icons/medals.png')}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    `Hello ${userGuest}`,
                    'You have no certificate yet, please completed a course',
                  )
                }>
                <Text style={{fontSize: LOW_DEVICES ? 20 : 16, color: 'white'}}>
                  Certificates
                </Text>
                <Text style={{fontSize: 10, color: 'white'}}>
                  Your latest certificates
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <Text
          style={{
            ...styles.bottomWrapperHeaderText,
            fontSize: 15,
            fontWeight: '100',
            color: 'gray',
          }}>
          On progress
        </Text> */}
        {takenCourses.length !== 0 ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{...styles.bottomWrapperHeaderText, marginTop: 0}}>
                  My Course
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('MyCoursesScr');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginRight: 25,
                    elevation: 2,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'gray',
                      alignSelf: 'center',
                    }}>
                    View All
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginHorizontal: PADDING_DEVICES_HOR,
                marginTop: 10,
                paddingHorizontal: 10,
              }}>
              <FlatList
                horizontal
                keyExtractor={(item) => item.id}
                data={takenCourses}
                showsHorizontalScrollIndicator
                renderItem={(itemData) => (
                  <TouchableNativeFeedback
                    onPress={() => {
                      props.navigation.navigate(COURSE_SCR, {
                        courseId: itemData.item.id,
                        courseTitle: itemData.item.title
                      });
                    }}>
                    <View
                      style={{
                        height: scrHeight * 0.35,
                        width: scrWidth / 2 - 2 * PADDING_DEVICES_HOR,
                        borderRadius: 10,
                        overflow: 'hidden',
                        elevation: 1,
                        marginRight: 10,
                        marginBottom: 10,
                        backgroundColor: 'white',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{
                            height: '56%',
                            width: '100%',
                            borderRadius: 5,
                          }}
                          source={{uri: itemData.item.images}}
                        />
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 15,
                              color: 'black',
                              paddingHorizontal: 10,
                            }}>
                            {itemData.item.title}
                          </Text>
                          <ProgressBar
                            style={{
                              width: 150,
                              height: 10,
                              marginTop: 10,
                              marginHorizontal: 20,
                            }}
                            progress={0.5}
                            color={Colors.PrimaryColor}
                          />
                          <ButtonTemplate
                            onPress={() => {
                              props.navigation.navigate('EnrollScr', {
                                courseId: itemData.item.id,
                              });
                            }}
                            textColor="white"
                            textSize={LOW_DEVICES ? 15 : 10}
                            title="Continue"
                            titleStyle={{fontsize: 10}}
                            bgcolor={Colors.AccentColor}
                            buttonSty={{
                              alignItems: 'center',
                              marginTop: 10,
                              width: '90%',
                              height: 40,
                            }}
                          />
                        </View>
                      </View>
                      {/* <View style={{marginLeft: 10, width: '70%'}}></View> */}
                    </View>
                  </TouchableNativeFeedback>
                )}
              />
            </View>
          </View>
        ) : null}

        <Text style={styles.bottomWrapperHeaderText}>Latest Courses</Text>
        <View style={{marginLeft: PADDING_DEVICES_HOR}}>
          <FlatList
            initialNumToRender={4}
            horizontal={true}
            style={{marginTop: 10}}
            keyExtractor={(item, index) => item.id}
            data={availableCourse}
            showsHorizontalScrollIndicator={false}
            renderItem={(itemData) => (
              <CourseItem
                image={itemData.item.images}
                title={itemData.item.title}
                price={itemData.item.price}
                category={itemData.item.category}
                courserating={itemData.item.ratingSum}
                onSelect={() => {
                  selectCourseHandler(
                    itemData.item.id,
                    itemData.item.title,
                    itemData.item.rating,
                  );
                }}
              />
            )}
          />
        </View>
        <Text style={styles.bottomWrapperHeaderText}>Last Seen Courses</Text>
        <View
          style={{
            marginHorizontal: PADDING_DEVICES_HOR,
            // flexWrap: 'wrap',
          }}>
          {lastSeenCourses.length <= 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 100,
              }}>
              <Text>Not viewed any course yet</Text>
            </View>
          ) : null}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 10}}
            keyExtractor={(item) => item.id}
            data={lastSeenCourses}
            initialNumToRender={3}
            renderItem={(itemData) => (
              <SmallListCourseItem
                widthSize={scrWidth / 1.7}
                itemstyle={{marginRight: 10}}
                initialNumToRender="2"
                images={itemData.item.images}
                title={itemData.item.title}
                price={itemData.item.price}
                totalLesson={itemData.item.totalLesson}
                category={itemData.item.category}
                onSelect={() => {
                  selectCourseHandler(itemData.item.id, itemData.item.title);
                }}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: 'powderblue',
    flex: 1,
    paddingTop: 10,
  },
  HeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDING_DEVICES_HOR,
    marginTop: 5,
  },
  upperCard: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: scrWidth * 0.8,
    height: scrHeight * 0.2,
  },
  maincard: {
    width: scrWidth / 4,
    height: scrWidth / 4,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: 'white',
  },
  imagecard: {
    width: '100%',
    height: '100%',
  },
  textCard: {
    paddingLeft: 10,
    backgroundColor: 'white',
    elevation: 1,
    width: scrWidth / 1.9,
    height: scrWidth / 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 5,
    marginLeft: -5,
  },
  headerIconsty: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginRight: 10,
    padding: 7,
  },
  headerIconImageSty: {
    width: scrHeight * 0.035,
    height: scrHeight * 0.035,
    padding: 10,
  },
  headerIconImageLeadCert: {
    width: scrHeight * 0.05,
    height: scrHeight * 0.05,
  },
  ProfileImageWrapper: {
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  textInput: {
    borderRadius: 10,
    paddingLeft: 20,
    height: 40,
    width: scrWidth * 0.75,
    backgroundColor: 'white',
  },
  bottomWrapper: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  bottomWrapperHeaderText: {
    marginLeft: PADDING_DEVICES_HOR + 10,
    fontSize: LOW_DEVICES ? 20 : 23,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 20,
  },
  bottomCategoryText: {
    marginLeft: PADDING_DEVICES_HOR + 10,
    fontSize: 25,
    // fontWeight: '100',
  },
  courseCardButton: {
    marginTop: 10,
    backgroundColor: Colors.AccentColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  upperCardText: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 10,
    elevation: 2,
    paddingLeft: 10,
    paddingVertical: 5,
  },
  upperCardText2: {
    flex: 1,
    backgroundColor: Colors.PrimaryColor,
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 10,
    elevation: 2,
    // paddingLeft: 10,
    paddingVertical: 5,
  },
});

export default HomeScreen;
