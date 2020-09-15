import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {scrWidth, scrHeight} from '../components/screenSize';
import {Card, Title, Paragraph} from 'react-native-paper';
import Colors from '../components/colors';

const max = '100%';
const EnrolledCourses = (props) => {
  const {navigation, route} = props;
  const {courseId} = route.params;

  const takenCourse = useSelector((state) => state.courses.takenCourse);
  const selectedTakenCourse = takenCourse.find(
    (course) => course.id === courseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedTakenCourse.title,
      color: 'red'
    });
  }, [navigation, selectedTakenCourse.title]);

  return (
    <ScrollView style={{padding: 10,}}>
      <View>
        <Card style={{marginBottom: 20,}}>
          <Image
            style={{width: '100%', height: scrHeight / 3,}}
            source={{uri: selectedTakenCourse.images}}
          />
        </Card>
      </View>
      <View>
        <Card style={{marginBottom: 5,}}>
          <Card.Content>
            <Title>Lesson 1</Title>
            <Paragraph numberOfLines={2}>{selectedTakenCourse.description}</Paragraph>
          </Card.Content>
        </Card>
        <Card style={{marginBottom: 5,}}>
          <Card.Content>
            <Title>Lesson 2</Title>
            <Paragraph numberOfLines={2}>{selectedTakenCourse.description}</Paragraph>
          </Card.Content>
        </Card>
        <Card style={{marginBottom: 5,}}>
          <Card.Content>
            <Title>Lesson 3</Title>
            <Paragraph numberOfLines={2}>{selectedTakenCourse.description}</Paragraph>
          </Card.Content>
        </Card>
        <Card style={{marginBottom: 5,}}>
          <Card.Content>
            <Title>Lesson 4</Title>
            <Paragraph numberOfLines={2}>{selectedTakenCourse.description}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default EnrolledCourses;

const styles = StyleSheet.create({});
