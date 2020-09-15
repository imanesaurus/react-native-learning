import * as React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import {NavigationContainer} from '@react-navigation/native';
import CompanyScreen from './src/pages/companyScreen';
import LoginScreen from './src/pages/loginScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import HomeScreen from './src/pages/HomeScreen';
import MainStackNavigator from './src/navigation/MainStackNavigatior';
import BottomTabNavigatior from './src/navigation/BottomTabNavigator';
// import MainStackNavigator from './src/navigation/MainStackNavigator'
import coursesReducer from './store/reducers/courses';
import userReducer from './store/reducers/login';
import authReducer from './store/reducers/auth';
import ratingReducer from './store/reducers/ratings';

const rootReducer = combineReducers({
  courses: coursesReducer,
  user: userReducer,
  auth: authReducer,
  rating:  ratingReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
