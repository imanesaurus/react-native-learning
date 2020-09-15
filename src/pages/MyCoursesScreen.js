import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import SmallListCourseItem from '../components/courses/SmallListItem';

const MyCoursesScreen = (props) => {
  const takenCourse = useSelector((state) => state.courses.takenCourse);
  const COURSE_SCREEN = 'CourseScr';
  const ENROLL_SCREEN = 'EnrollScr';

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.centered}>
        <Text style={styles.textStyles}>
          You have {takenCourse.length} Courses
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={takenCourse}
        keyExtractor={(item, index) => item.id}
        renderItem={(itemData) => (
          <View style={{marginHorizontal: 15}}>
            <SmallListCourseItem
              playicon
              addicon
              images={itemData.item.images}
              title={itemData.item.title}
              price={itemData.item.price}
              totalLesson={itemData.item.totalLesson}
              category={itemData.item.category}
              onSelect={() => {
                props.navigation.navigate(COURSE_SCREEN, {
                  courseId: itemData.item.id,
                });
              }}
              buttonPress={() => {
                props.navigation.navigate(ENROLL_SCREEN, {
                  courseId: itemData.item.id,
                });
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default MyCoursesScreen;

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyles: {
    marginTop: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 10,
  },
});
