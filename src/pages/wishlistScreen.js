import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as WishAction from '../../store/actions/courses';
import SmallListCourseItem from '../components/courses/SmallListItem';
import {scrWidth} from '../components/screenSize';

const HIGH_DEVICES = scrWidth > 360;

const WishlistScreen = (props) => {
  const wishCourse = useSelector((state) => state.courses.whishlistCourses);
  const COURSE_SCR = 'CourseScr';
  const {route} = props;
  const selectCourseHandler = (id, title) => {
    props.navigation.navigate(COURSE_SCR, {
      courseId: id,
      courseTitle: title,
    });
  };

  const dispatch = useDispatch();
  if (wishCourse.length === 0) {
    return (
      <View style={styles.content}>
        <Text>No Wishlist Courses</Text>
      </View>
    );
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.centered}>
        <Text style={styles.textStyles}>
          Total: {wishCourse.length} Courses
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={wishCourse}
        keyExtractor={(item, index) => item.id}
        renderItem={(itemData) => (
          <View style={{marginHorizontal: 15}}>
            <Card>
              <SmallListCourseItem
                itemstyle={{marginBottom: 10}}
                addiconad
                images={itemData.item.images}
                title={itemData.item.title}
                price={itemData.item.price}
                totalLesson={itemData.item.totalLesson}
                category={itemData.item.category}
                onSelect={() => {
                  selectCourseHandler(itemData.item.id, itemData.item.title);
                }}
                buttonPress={() => {
                  dispatch(WishAction.removeFromCart(itemData.item.id));
                }}
              />
            </Card>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textStyles: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    padding: 8,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 4,
  },
});
export default WishlistScreen;
