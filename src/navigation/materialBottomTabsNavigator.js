import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import {createBottomTabNavigator, BottomTabBar} from '@react-navigation-tabs'
import React from 'react';
import {Image, View, StyleSheet, Dimensions, Animated} from 'react-native';
import Colors from '../components/colors';
import {UserContext} from '../components/Context';
import {scrHeight} from '../components/screenSize';
import BrowseScreen from '../pages/BrowseScreen';
import HomeScreen from '../pages/HomeScreen';
import ProfileScreen from '../pages/ProfileScreen';

const Tab = createMaterialTopTabNavigator();
const TextColor = Colors.TextColor;

const CustomBottomBar = (tabBarPosition) => {
  tabBarPosition = 'bottom';
  return (
    <View style={{backgroundColor: 'red'}}>
      <Animated.View style={animStyles} />
      <Text>lele</Text>
      {/* <BottomTabBar {...props} style={{backgroundColor: 'tranparent'}} /> */}
    </View>
  );
};

export default function MaterialBottomTabs({route}) {
  return (
    <UserContext.Provider value={route.params.userGuest}>
      <Tab.Navigator
        tabBarPosition="bottom"
        tabBarOptions={{
          renderIndicator: () => null,
          showIcon: true,
          style: {
            height: scrHeight * 0.1,
            backgroundColor: Colors.PrimaryColor,
            elevation: 1,
          },
          labelStyle: {
            fontSize: 10,
          },
          activeTintColor: 'gray',
          inactiveTintColor: Colors.TextColor,
        }}
        // tab={(props) => <CustomBottomBar {...props} />}

        // style={{
        //   backgroundColor: Colors.PrimaryColor,
        //   justifyContent: 'center',
        // }}
      >
        <Tab.Screen
          name="Browse"
          component={BrowseScreen}
          options={{
            tabBarLabel: 'Browse',
            tabBarIcon: ({color}) => (
              <Image
                style={{width: 23, height: 23, tintColor: color}}
                source={require('../assets/icons/globe.png')}
              />
            ),
            tabBarOptions: {
              activeTintColor: 'red',
            },
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: Colors.PrimaryColor,
            tabBarIcon: ({color}) => (
              <Image
                style={{width: 23, height: 23, tintColor: color}}
                source={require('../assets/icons/home.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarColor: Colors.PrimaryColor,
            tabBarIcon: ({color}) => (
              <Image
                style={{width: 23, height: 23, tintColor: color}}
                source={require('../assets/icons/user.png')}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </UserContext.Provider>
  );
}
