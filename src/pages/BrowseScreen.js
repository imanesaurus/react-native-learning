import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import CategoryListItem from '../components/courses/CategoryListItem';
import SmallListCourseItem from '../components/courses/SmallListItem';
import {scrHeight, scrWidth} from '../components/screenSize';

const ProfileScreen = (props) => {
  const KEYBOARD_HIDE = 'Keyboard_Hide';
  const CATERGORY_SCR = 'CategoryScr';
  const COURSE_SCR = 'CourseScr';
  const availableCategory = useSelector((state) => state.courses.categoryList);
  const availableCourses = useSelector((state) => state.courses.courses);
  const [searchTerm, setSeacrhTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [visible, setVisible] = useState(false);

  const toogleOverlay = () => {
    setVisible(!visible);
  };

  const handleSearch = (text) => {
    setSeacrhTerm(text);
    setVisible(true);
  };

  // useEffect(() => {
  //   Keyboard.addListener('keyboardDidHide', _keyboardHide);

  //   // cleanup function
  //   return () => {
  //     Keyboard.removeListener('keyboardDidHide', _keyboardHide);
  //   };
  // }, []);

  useEffect(() => {
    const results = availableCourses.filter((Courses) =>
      Courses.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSearchResults(results);
  }, [searchTerm]);

  const selectCategoryHandler = (id, label) => {
    props.navigation.navigate(CATERGORY_SCR, {
      categoryId: id,
      categoryLabel: label,
    });
  };

  const selectCourseHandler = async (id, title) => {
    props.navigation.navigate(COURSE_SCR, {
      courseId: id,
      courseTitle: title,
    });
    await setVisible(false);
    Keyboard.addListener('keyboardDidHide', _keyboardHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidHide', _keyboardHide);
    };
  };

  const _keyboardHide = async () => {
    setVisible(false);
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TextInput
        placeholder="Search Courses, Skills, and Video Here..."
        onChangeText={handleSearch}
        value={searchTerm}
        style={styles.textInput}
        onSubmitEditing={Keyboard.dismiss}
        // onTouchStart={() => setVisible(true)}
        // onEndEditing={_keyboardHide}
        // onTouchEnd={toogleOverlay}
      />
      {visible && (
        <View style={{width: '100%', justifyContent: 'center'}}>
          <FlatList
            ListHeaderComponent={
              <Text
                style={{
                  marginTop: 20,
                  padding: 8,
                  borderColor: 'gray',
                  borderRadius: 10,
                  marginBottom: 20,
                  alignSelf: 'center',
                  elevation: 1,
                  backgroundColor: 'powderblue',
                }}>
                Found {searchResults.length} courses
              </Text>
            }
            showsVerticalScrollIndicator={false}
            style={{marginTop: 10, marginHorizontal: 10}}
            keyExtractor={(item) => item.id}
            data={searchResults}
            maxToRenderPerBatch={1}
            renderItem={(itemData) => (
              <SmallListCourseItem
                itemstyle={{marginRight: 10, marginBottom: 10, elevation: 2}}
                initialNumToRender="2"
                images={itemData.item.images}
                title={itemData.item.title}
                price={itemData.item.price}
                totalLesson={itemData.item.totalLesson}
                category={itemData.item.category}
                onSelect={() => {
                  selectCourseHandler(itemData.item.id, itemData.item.title);
                }}
                // onSelect={selectCourseHandler(itemData.item.id, itemData.item.title)}
              />
            )}
          />
        </View>
      )}
      {!visible && (
        <View style={{paddingBottom: 50}}>
          <FlatList
            ListHeaderComponent={
              <View style={{flex: 1}}>
                <View
                  style={{
                    height: 300,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 20}}> Discover Courses</Text>
                </View>
              </View>
            }
            // {/* <View> */}
            showsVerticalScrollIndicator={false}
            style={{marginTop: 10}}
            keyExtractor={(item) => item.id}
            data={availableCategory}
            renderItem={(itemData) => (
              <CategoryListItem
                image={itemData.item.image}
                category={itemData.item.label}
                onSelect={() => {
                  selectCategoryHandler(itemData.item.id, itemData.item.label);
                }}
              />
            )}
          />
          {/* </View> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'center',
    borderRadius: 10,
    paddingLeft: 20,
    height: scrHeight * 0.06,
    marginTop: 10,
    width: scrWidth * 0.9,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default ProfileScreen;
