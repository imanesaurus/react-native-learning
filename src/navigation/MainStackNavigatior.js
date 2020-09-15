import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../components/colors';
import CategoryOverviewScreen from '../pages/categoryOverviewScreen';
import CourseScreen from '../pages/CourseScreen';
import EnrolledCourses from '../pages/EnrolledCourses';
import LeaderboardScreen from '../pages/LeaderboardScreen';
import LoginScreen from '../pages/loginScreen';
import MyCoursesScreen from '../pages/MyCoursesScreen';
import ProfileScreen from '../pages/ProfileScreen';
import WishlistScreen from '../pages/wishlistScreen';
import MaterialBottomTabs from './materialBottomTabsNavigator';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="CompanyScr"
        component={CompanyScreen}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="LoginScr"
        component={LoginScreen}
        options={{
          headerShown: false,
          // ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="HomeScr"
        component={MaterialBottomTabs}
        options={{
          headerShown: false,
          // title: '',
          // headerStyle: {
          //   backgroundColor: Colors.PrimaryColor,
          //   elevation: 0,
          //   shadowOpacity: 0,
          // },
        }}
      />
      <Stack.Screen
        name="CourseScr"
        component={CourseScreen}
        options={{
          // ...TransitionPresets.ModalPresentationIOS,
          headerTintColor: 'white',
          headerTransparent: true,
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WishlistScr"
        component={WishlistScreen}
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          title: 'Wishlist',
          headerStyle: {
            backgroundColor: Colors.PrimaryColor,
          },
        }}
      />
      <Stack.Screen
        name="CategoryScr"
        component={CategoryOverviewScreen}
        options={{
          title: 'Category',
          headerStyle: {
            backgroundColor: Colors.PrimaryColor,
          },
        }}
      />
      <Stack.Screen
        name="EnrollScr"
        component={EnrolledCourses}
        options={{
          ...TransitionPresets.RevealFromBottomAndroid,
          headerStyle: {
            backgroundColor: Colors.PrimaryColor,
          },
        }}
      />
      <Stack.Screen
        name="LeaderboardScr"
        component={LeaderboardScreen}
        options={{
          title: 'Leaderboards',
          ...TransitionPresets.RevealFromBottomAndroid,
          headerStyle: {
            backgroundColor: Colors.PrimaryColor,
          },
        }}
      />
      <Stack.Screen
        name="MyCoursesScr"
        component={MyCoursesScreen}
        options={{
          title: 'My Courses',
          ...TransitionPresets.ModalPresentationIOS,
          headerStyle: {
            backgroundColor: Colors.PrimaryColor,
          },
        }}
      />
      <Stack.Screen
        name="ProfileScr"
        component={ProfileScreen}
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          headerStyle: {
            backgroundColor: Colors.PrimaryColor,
          },
          // tabBarColor: Colors.PrimaryColor,
          // tabBarIcon: ({color}) => (
          //   <Image
          //     style={{width: 23, height: 23, tintColor: color}}
          //     source={require('../assets/icons/user.png')}
          //   />
          // ),
        }}
      />
    </Stack.Navigator>
  );
}
