import React, {useLayoutEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addWIshlist} from '../../store/actions/courses';
import CustomBadge from '../components/Badge';
import Colors from '../components/colors';
import CategoryOverviewItem from '../components/courses/CategoryOverview';
import HeaderButton from '../components/HeaderButton';

const CategoryOverviewScreen = (props) => {
  const COURSE_SCR = 'CourseScr';
  const WISHLIST_SCR = 'WishlistScr';
  const {navigation, route} = props;
  const availableCategory = useSelector((state) => state.courses.categoryList);
  const availableCourse = useSelector((state) => state.courses.courses);
  const wishCourse = useSelector((state) => state.courses.whishlistCourses);
  const {categoryId, categoryLabel, courseId} = route.params;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            marginRight: 35,
          }}>
          <TouchableOpacity onPress={wishlistToggleHandler}>
            <HeaderButton
              image={require('../assets/icons/heartbeat.png')}
              color={Colors.TextColor}
            />
          </TouchableOpacity>
          {wishCourse.length > 0 && <CustomBadge />}
        </View>
      ),
    });
  });

  const wishlistToggleHandler = () => {
    navigation.navigate(WISHLIST_SCR);
  };
  const selectedCategory = availableCategory.find(
    (category) => category.id === categoryId,
  );

  const displayedCourse = availableCourse.filter(
    (course) => course.category.indexOf(categoryLabel) >= 0,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${selectedCategory.label} Category`,
    });
  }, [navigation]);

  const selectCoourseHandler = (id, title) => {
    props.navigation.navigate(COURSE_SCR, {
      courseId: id,
      courseTitle: title,
    });
  };

  return (
    <View>
      <TouchableOpacity>
        <FlatList
          style={{marginTop: 10}}
          keyExtractor={(item, index) => item.id}
          data={displayedCourse}
          renderItem={(itemData) => (
            <CategoryOverviewItem
              image={itemData.item.images}
              title={itemData.item.title}
              price={itemData.item.price}
              category={itemData.item.category}
              uid={itemData.item.uid}
              buttonPress={() => {
                dispatch(addWIshlist(itemData.item.id));
              }}
              onSelect={() => {
                selectCoourseHandler(itemData.item.id, itemData.item.title);
              }}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
export default CategoryOverviewScreen;
