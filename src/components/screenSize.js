import React, {Component} from 'react';
import {Dimensions} from 'react-native';

export const scrWidth = Dimensions.get('window').width;
export const scrHeight = Dimensions.get('window').height;
export const screenW = Dimensions.get('screen').width;
export const screenH = Dimensions.get('screen').height;


export default {scrWidth, scrHeight};
