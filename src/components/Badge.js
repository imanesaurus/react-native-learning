import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {Badge} from 'react-native-elements';
import Colors from '../components/colors';


const CustomBadge = (props) => {
  const wishCourse = useSelector((state) => state.courses.whishlistCourses);
  return (
    <Badge
      value={wishCourse.length}
      options={{
        hidden: true
      }}
      containerStyle={{position: 'absolute', top: -4, right: -4}}
      badgeStyle={{backgroundColor: Colors.AccentColor}}
    />
  );
};

export default CustomBadge;
